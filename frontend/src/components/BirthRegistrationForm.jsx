import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "./firebase"; // Adjust the path as necessary
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BirthRegistrationForm = () => {
  const [formData, setFormData] = useState({
    childName: "",
    dateOfBirth: "",
    gender: "",
    placeOfBirth: "",
    motherName: "",
    motherDOB: "",
    fatherName: "",
    fatherDOB: "",
    parentAddress: "",
    contactEmail: "",
    contactPhone: "",
    doctorName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.doctorName) {
      setLoading(false);
      return toast.error("Please enter the delivering doctor's name.");
    }

    try {
      await addDoc(collection(db, "birthRecords"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      toast.success("Birth registration submitted successfully!");

      // Reset form fields
      setFormData({
        childName: "",
        dateOfBirth: "",
        gender: "",
        placeOfBirth: "",
        motherName: "",
        motherDOB: "",
        fatherName: "",
        fatherDOB: "",
        parentAddress: "",
        contactEmail: "",
        contactPhone: "",
        doctorName: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
            name="childName"
            placeholder="Child Full Name"
            value={formData.childName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Child Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="placeOfBirth"
            placeholder="Place of Birth (e.g., Hospital Name)"
            value={formData.placeOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mother Details */}
        <div>
          <input
            type="text"
            name="motherName"
            placeholder="Mother’s Full Name"
            value={formData.motherName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="motherDOB"
            placeholder="Mother’s Date of Birth"
            value={formData.motherDOB}
            onChange={handleChange}
            required
          />
        </div>

        {/* Father Details */}
        <div>
          <input
            type="text"
            name="fatherName"
            placeholder="Father’s Full Name"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fatherDOB"
            placeholder="Father’s Date of Birth"
            value={formData.fatherDOB}
            onChange={handleChange}
            required
          />
        </div>

        {/* Parent Contact */}
        <div>
          <textarea
            rows="2"
            name="parentAddress"
            placeholder="Parent’s Address"
            value={formData.parentAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contactPhone"
            placeholder="Contact Phone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="doctorName"
            placeholder="Delivering Doctor Name"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register Birth"}
        </button>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default BirthRegistrationForm;
