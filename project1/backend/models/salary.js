import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true
    },

    basic: {
      type: Number,
      required: true
    },

    hra: {
      type: Number,
      required: true
    },

    conveyance: {
      type: Number,
      required: true
    },

    grossSalary: {
      type: Number,
      required: true
    },

    employeePF: {
      type: Number,
      required: true
    },

    employerPF: {
      type: Number,
      required: true
    },

    eps: {
      type: Number,
      required: true
    },

    epf: {
      type: Number,
      required: true
    },

    employeeESIC: {
  type: Number,
  required: true
},

employerESIC: {
  type: Number,
  required: true
},

netSalary: {
  type: Number,
  required: true
},

ctc: {
  type: Number,
  required: true
}


  },
  { timestamps: true }
);

export default mongoose.model("Salary", salarySchema);
