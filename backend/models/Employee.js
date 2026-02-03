import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: Number,
      unique: true,
      required: true,
      index: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    employeeEmail: {
      type: String,
      required: true,
      unique: true,
    },
    employeeNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
