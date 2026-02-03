import express from "express";
import {
  createSalary,
  getAllSalaries,
  getSalaryById,
  getSalaryByEmployeeCode,
  updateSalary,
  deleteSalary
} from "../controllers/salarycontroller.js";

const router = express.Router();

router.post("/", createSalary);                    // Create salary
router.get("/", getAllSalaries);                   // Get all salaries (paginated)
router.get("/employee/:employeeCode", getSalaryByEmployeeCode); // Get salary by employee code
router.get("/:id", getSalaryById);                 // Get salary by ID
router.put("/:id", updateSalary);                  // Update salary
router.delete("/:id", deleteSalary);               // Delete salary

export default router;
