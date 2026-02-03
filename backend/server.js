import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import salaryRoutes from "./routes/salaryRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/employees", employeeRoutes);
app.use("/salary-master", salaryRoutes);

// Basic health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
