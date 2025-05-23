import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const [birthRecords, setBirthRecords] = useState([]);
  const { isAuthenticated, admin } = useContext(Context);
  const db = getFirestore();
  console.log(admin)

  useEffect(() => {
    const fetchBirthRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "birthRecords"));
        const records = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBirthRecords(records);
      } catch (error) {
        console.error("Error fetching birth records:", error);
        setBirthRecords([]);
      }
    };

    fetchBirthRecords();
  }, [db]);

  const handleUpdateStatus = async (recordId, newStatus) => {
    try {
      const recordRef = doc(db, "birthRecords", recordId);
      await updateDoc(recordRef, { status: newStatus });

      setBirthRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === recordId ? { ...record, status: newStatus } : record
        )
      );

      toast.success("Status updated successfully.");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="dashboard page">
      {/* Banner Section */}
      <div className="banner">
        <div className="firstBox">
          <img
            src="https://t4.ftcdn.net/jpg/02/45/14/15/360_F_245141551_lHJ9QNADCsWDCkSFUWQ9khkLURlhpYPR.jpg"
            alt="babyImg"
          />
          <div className="content">
            <div>
              <p>Welcome,</p>
              {/* <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5> */}
            </div>
            <p>
              This dashboard allows you to view and manage all birth
              registrations. You can update a record’s status or view detailed
              information for each child registered.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Birth Records</p>
          <h3>{birthRecords.length}</h3>
        </div>
      </div>

      {/* Birth Records Table */}
      <div className="records-container">
        <h5>Birth Records</h5>
        <div className="table-wrapper">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Child</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Place of Birth</th>
                <th>Mother</th>
                <th>Father</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {birthRecords.length > 0 ? (
                birthRecords.map((record) => (
                  <tr key={record.id}>
                    <td data-label="Child">{record.childName}</td>
                    <td data-label="DOB">
                      {new Date(record.dateOfBirth)
                        .toISOString()
                        .substring(0, 10)}
                    </td>
                    <td data-label="Gender">{record.gender}</td>
                    <td data-label="Place of Birth">{record.placeOfBirth}</td>
                    <td data-label="Mother">{record.motherName}</td>
                    <td data-label="Father">{record.fatherName}</td>
                    <td data-label="Doctor">{record.doctorName}</td>
                    <td data-label="Status">
                      <select
                        // className={`status-select status-${record.status.toLowerCase()}`}
                        className={`status-select status-${record.status}`}
                        value={record.status}
                        onChange={(e) =>
                          handleUpdateStatus(record.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No birth records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
