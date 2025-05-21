import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [birthRecords, setBirthRecords] = useState([]);

  useEffect(() => {
    const fetchBirthRecords = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/birth-records/getall",
          { withCredentials: true }
        );
        setBirthRecords(data.records);
      } catch (error) {
        console.error("Error fetching birth records:", error);
        setBirthRecords([]);
      }
    };
    fetchBirthRecords();
  }, []);

  const handleUpdateStatus = async (recordId, newStatus) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/birth-records/update-status/${recordId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setBirthRecords((prevRecords) =>
        prevRecords.map((record) =>
          record._id === recordId ? { ...record, status: newStatus } : record
        )
      );

      toast.success(data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
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
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
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
              {birthRecords && birthRecords.length > 0 ? (
                birthRecords.map((record) => (
                  <tr key={record._id}>
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
                        className={`status-select status-${record.status.toLowerCase()}`}
                        value={record.status}
                        onChange={(e) =>
                          handleUpdateStatus(record._id, e.target.value)
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
