import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BirthRegistrationForm = () => {
  const [childName, setChildName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherDOB, setMotherDOB] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherDOB, setFatherDOB] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // *** New doctor-related state ***
  // const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDoctorName, setSelectedDoctorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedDoctorName) {
        return toast.error("Please select the delivering doctor");
      }

      const payload = {
        childName,
        dateOfBirth,
        gender,
        placeOfBirth,
        motherName,
        motherDOB,
        fatherName,
        fatherDOB,
        parentAddress,
        contactEmail,
        contactPhone,
        doctorName: selectedDoctorName,
      };

      const { data } = await axios.post(
        // "http://localhost:5000/api/v1/birth-records/post",
        "https://birthregistration.onrender.com/api/v1/birth-records/post",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      // Reset all form fields
      setChildName("");
      setDateOfBirth("");
      setGender("");
      setPlaceOfBirth("");
      setMotherName("");
      setMotherDOB("");
      setFatherName("");
      setFatherDOB("");
      setParentAddress("");
      setContactEmail("");
      setContactPhone("");
      setSelectedDoctorName("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div
      className="container form-component birth-form"
      style={{ marginTop: 50 }}
    >
      <h2>Birth Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Child Info */}
        <div>
          <input
            type="text"
            placeholder="Child Full Name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
          />
          <input
            type="date"
            placeholder="Child Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Place of Birth (e.g., Hospital Name)"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
          />
        </div>

        {/* Mother Details */}
        <div>
          <input
            type="text"
            placeholder="Mother’s Full Name"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
          />
          <input
            type="date"
            placeholder="Mother’s Date of Birth"
            value={motherDOB}
            onChange={(e) => setMotherDOB(e.target.value)}
          />
        </div>

        {/* Father Details */}
        <div>
          <input
            type="text"
            placeholder="Father’s Full Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
          <input
            type="date"
            placeholder="Father’s Date of Birth"
            value={fatherDOB}
            onChange={(e) => setFatherDOB(e.target.value)}
          />
        </div>

        {/* Parent Contact */}
        <div>
          <textarea
            rows="2"
            placeholder="Parent’s Address"
            value={parentAddress}
            onChange={(e) => setParentAddress(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Contact Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Phone"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Deliver Doctor Name"
            value={selectedDoctorName}
            onChange={(e) => setSelectedDoctorName(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button type="submit">Register Birth</button>
      </form>
    </div>
  );
};

export default BirthRegistrationForm;
