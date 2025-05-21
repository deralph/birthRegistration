import mongoose from "mongoose";
import validator from "validator";

const birthRecordSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: [true, "Child’s Name is required!"],
    minLength: [2, "Child’s Name must contain at least 2 characters!"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of Birth is required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required!"],
    enum: ["Male", "Female", "Other"],
  },
  placeOfBirth: {
    type: String,
    required: [true, "Place of Birth is required!"],
    minLength: [3, "Place of Birth must contain at least 3 characters!"],
  },

  // Mother Details
  motherName: {
    type: String,
    required: [true, "Mother’s Name is required!"],
    minLength: [3, "Mother’s Name must contain at least 3 characters!"],
  },
  motherDOB: {
    type: Date,
    required: [true, "Mother’s Date of Birth is required!"],
  },

  // Father Details
  fatherName: {
    type: String,
    required: [true, "Father’s Name is required!"],
    minLength: [3, "Father’s Name must contain at least 3 characters!"],
  },
  fatherDOB: {
    type: Date,
    required: [true, "Father’s Date of Birth is required!"],
  },

  // Parent Contact
  parentAddress: {
    type: String,
    required: [true, "Parent’s Address is required!"],
    minLength: [5, "Address must contain at least 5 characters!"],
  },
  contactEmail: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  contactPhone: {
    type: String,
    required: [true, "Phone number is required!"],
    minLength: [7, "Phone number must contain at least 7 digits!"],
    maxLength: [15, "Phone number must not exceed 15 digits!"],
  },

  // Delivering Doctor Details
  doctorName: {
    type: String,
    required: [true, "Delivering Doctor’s Name is required!"],
    minLength: [3, "Doctor’s Name must contain at least 3 characters!"],
  },

  // Registrar (Who enters the record)
  registrarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Registrar ID is required!"],
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Approved", "Rejected"],
    default: "Pending",
  },
});

export const BirthRecord = mongoose.model("BirthRecord", birthRecordSchema);
