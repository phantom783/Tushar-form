import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import salaryRoutes from "./routes/salaryRoutes.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use("/salary-master", salaryRoutes);


mongoose
  .connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));


const employeeSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: Number,
      unique: true,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    employeeEmail: {
      type: String,
      required: true,
    },
    employeeNumber: {
      type: String,
      required: true,
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

const Employee = mongoose.model("Employee", employeeSchema);

//schema
const salaryMasterSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: Number,
      required: true,
      unique: true, 
    },

    // Earnings
    basic: { type: Number, required: true },
    hra: { type: Number, default: 0 },
    conveyance: { type: Number, default: 0 },
    otherAllowance: { type: Number, default: 0 },

    gross: { type: Number, required: true },

    // PF
    employeePF: { type: Number, required: true },
    employerPF: { type: Number, required: true },
    eps: { type: Number, required: true },
    employerEPF: { type: Number, required: true },

    // ESIC
    employeeESIC: { type: Number, default: 0 },
    employerESIC: { type: Number, default: 0 },

    // Final
    netSalary: { type: Number, required: true },
    ctc: { type: Number, required: true },
  },
  { timestamps: true }
);

const SalaryMaster = mongoose.model("SalaryMaster", salaryMasterSchema);


const generateEmployeeCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(1000 + Math.random() * 9000);
    exists = await Employee.exists({ employeeCode: code });
  }

  return code;
};




app.post("/employees", async (req, res) => {
  try {
    const {
      employeeName,
      employeeEmail,
      employeeNumber,
      dob,
      joiningDate,
    } = req.body;

    // Age validation (18+)
    const dobDate = new Date(dob);
    const minJoiningDate = new Date(dobDate);
    minJoiningDate.setFullYear(minJoiningDate.getFullYear() + 18);

    if (new Date(joiningDate) < minJoiningDate) {
      return res.status(400).json({
        message: "Employee must be at least 18 years old at joining",
      });
    }

    const employeeCode = await generateEmployeeCode();

    const employee = new Employee({
      employeeCode,
      employeeName,
      employeeEmail,
      employeeNumber,
      dob,
      joiningDate,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/employees", async (req, res) => {
  try {
   
    if (req.query.dropdown === "true") {
      const employees = await Employee.find(
        {},
        "employeeName employeeCode"
      );
      return res.json(employees);
    }

    // Paginated list
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalEmployees = await Employee.countDocuments();

    const employees = await Employee.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: employees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/salary-master", async (req, res) => {
  try {
    const {
      employeeCode,
      basic,
      hra,
      conveyance,
      otherAllowance,
      gross,
      employeePF,
      employerPF,
      eps,
      employerEPF,
      employeeESIC,
      employerESIC,
      netSalary,
      ctc,
    } = req.body;


    const existing = await SalaryMaster.findOne({ employeeCode });
    if (existing) {
      return res.status(400).json({
        message: "Salary master already exists for this employee",
      });
    }

    const salaryMaster = new SalaryMaster({
      employeeCode,
      basic,
      hra,
      conveyance,
      otherAllowance,
      gross,
      employeePF,
      employerPF,
      eps,
      employerEPF,
      employeeESIC,
      employerESIC,
      netSalary,
      ctc,
    });

    await salaryMaster.save();
    res.status(201).json(salaryMaster);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
