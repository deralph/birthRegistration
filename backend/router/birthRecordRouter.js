import express from "express";
import {
  updateBirthRecord,
  getAllBirthRecords,
  getBirthRecordById,
  postBirthRecord,
  deleteBirthRecord,
  updateBirthRecordStatus,
} from "../controller/birthRecordController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postBirthRecord);
router.get("/getall", isAdminAuthenticated, getAllBirthRecords);
router.get("/getById/:id", isAdminAuthenticated, getBirthRecordById);
router.put("/update/:id", isAdminAuthenticated, updateBirthRecord);
router.put("/update-status/:id", isAdminAuthenticated, updateBirthRecordStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteBirthRecord);

export default router;
