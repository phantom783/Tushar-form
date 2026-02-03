import express from "express";
import {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  checkEmployeeCodeExists,
} from "../controllers/EmployeeController.js";

const router = express.Router();

// Employee Routes with ORM
router.post("/", createEmployee);           // POST /employees
router.get("/", getAllEmployees);           // GET /employees
router.get("/:id", getEmployeeById);        // GET /employees/:id
router.put("/:id", updateEmployee);         // PUT /employees/:id
router.delete("/:id", deleteEmployee);      // DELETE /employees/:id
router.get("/check/:code", checkEmployeeCodeExists); // GET /employees/check/:code

export default router;
