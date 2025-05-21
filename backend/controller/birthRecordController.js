import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { BirthRecord } from "../models/birthRecordSchema.js";
import { User } from "../models/userSchema.js";

// POST /api/v1/birth-records
export const postBirthRecord = catchAsyncErrors(async (req, res, next) => {
  const {
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
    doctorName,
  } = req.body;

  console.log(req.body);

  // 1. Check required fields
  if (
    !childName ||
    !dateOfBirth ||
    !gender ||
    !placeOfBirth ||
    !motherName ||
    !motherDOB ||
    !fatherName ||
    !fatherDOB ||
    !parentAddress ||
    !contactEmail ||
    !contactPhone ||
    !doctorName
  ) {
    return next(new ErrorHandler("Please fill out the entire form!", 400));
  }

  // 2. Verify that the provided doctorId corresponds to a user with role 'doctor'
  // const doctorUser = await User.findOne({ _id: doctorId, role: "doctor" });
  // if (!doctorUser) {
  //   return next(
  //     new ErrorHandler("Delivering doctor not found or invalid!", 404)
  //   );
  // }

  // 3. Create new BirthRecord
  const newRecord = await BirthRecord.create({
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
    doctorName,
    registrarId: req.user._id, // the logged-in registrar
  });

  res.status(201).json({
    success: true,
    birthRecord: newRecord,
    message: "Birth record created successfully!",
  });
});

// GET /api/v1/birth-records
export const getAllBirthRecords = catchAsyncErrors(async (req, res, next) => {
  // Admin sees all records; registrar sees only their own
  let filter = {};
  if (req.user.role !== "admin") {
    filter = { registrarId: req.user._id };
  }
  const records = await BirthRecord.find({});
  // .populate("registrarId", "name email") // populate registrar’s basic info
  // .sort({ registrationDate: -1 });
  console.log("records = ", records);
  res.status(200).json({
    success: true,
    records,
  });
});

// GET /api/v1/birth-records/:id
export const getBirthRecordById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const record = await BirthRecord.findById(id)
    .populate("doctorId", "name email")
    .populate("registrarId", "name email");
  if (!record) {
    return next(new ErrorHandler("Birth record not found!", 404));
  }

  // Only admin or original registrar can view
  if (
    req.user.role !== "admin" &&
    record.registrarId._id.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to view this record.", 403));
  }

  res.status(200).json({
    success: true,
    record,
  });
});

// PUT /api/v1/birth-records/:id
export const updateBirthRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let record = await BirthRecord.findById(id);
  if (!record) {
    return next(new ErrorHandler("Birth record not found!", 404));
  }

  // Only admin or the original registrar can edit
  if (
    req.user.role !== "admin" &&
    record.registrarId.toString() !== req.user._id.toString()
  ) {
    return next(new ErrorHandler("Not authorized to update this record.", 403));
  }

  // If doctorId or doctorName is being updated, validate the new doctor
  // const { doctorId, doctorName } = req.body;
  // if (doctorId) {
  //   const doctorUser = await User.findOne({ _id: doctorId, role: "doctor" });
  //   if (!doctorUser) {
  //     return next(
  //       new ErrorHandler("Delivering doctor not found or invalid!", 404)
  //     );
  //   }
  // Overwrite doctorName from User’s name, if desired:
  // req.body.doctorName = doctorUser.name;
  // }

  record = await BirthRecord.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    record,
    message: "Birth record updated successfully!",
  });
});

// DELETE /api/v1/birth-records/:id
export const deleteBirthRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const record = await BirthRecord.findById(id);
  if (!record) {
    return next(new ErrorHandler("Birth record not found!", 404));
  }

  // Only admin can delete permanently
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Not authorized to delete this record.", 403));
  }

  await record.deleteOne();

  res.status(200).json({
    success: true,
    message: "Birth record deleted successfully!",
  });
});

// PATCH /api/v1/birth-records/:id/status
export const updateBirthRecordStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Reviewed", "Approved", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return next(new ErrorHandler("Invalid status value!", 400));
    }

    let record = await BirthRecord.findById(id);
    if (!record) {
      return next(new ErrorHandler("Birth record not found!", 404));
    }

    // Only admin can update status
    if (req.user.role !== "admin") {
      return next(new ErrorHandler("Not authorized to update status.", 403));
    }

    record.status = status;
    await record.save();

    res.status(200).json({
      success: true,
      message: `Record status updated to ${status}!`,
    });
  }
);
