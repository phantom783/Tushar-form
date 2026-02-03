import express from "express";
import { createSalary } from "../controllers/salarycontroller.js";

const router = express.Router();


router.post("/", createSalary);

export default router;
