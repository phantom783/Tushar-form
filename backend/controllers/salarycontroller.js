import Salary from "../models/salary.js";

export const createSalary = async (req, res) => {
  try {
    const { employeeCode, basic, hra, conveyance, otherAllowance } = req.body;

    // Earnings
    const grossSalary = basic + hra + conveyance + (otherAllowance || 0);

    // PF
    const employeePF = basic * 0.12;
    const employerPF = basic * 0.12;
    const eps = basic * 0.0833;
    const epf = employerPF - eps;

    // ESIC
    let employeeESIC = 0;
    let employerESIC = 0;

    if (grossSalary <= 21000) {
      employeeESIC = grossSalary * 0.0075;
      employerESIC = grossSalary * 0.0325;
    }

    // Net Salary
    const netSalary = grossSalary - employeePF - employeeESIC;

    // CTC
    const ctc = grossSalary + employerPF + employerESIC;

    const salary = await Salary.create({
      employeeCode,
      basic,
      hra,
      conveyance,
      otherAllowance: otherAllowance || 0,
      grossSalary,
      employeePF,
      employerPF,
      eps,
      epf,
      employeeESIC,
      employerESIC,
      netSalary,
      ctc
    });

    res.status(201).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSalaries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const salaries = await Salary.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Salary.countDocuments();

    res.status(200).json({
      data: salaries,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSalaries: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSalaryByEmployeeCode = async (req, res) => {
  try {
    const salary = await Salary.findOne({ employeeCode: req.params.employeeCode });
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found for this employee" });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndDelete(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found" });
    }
    res.status(200).json({ message: "Salary record deleted successfully", salary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
