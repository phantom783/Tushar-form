import Salary from "../models/salary.js";

export const createSalary = async (req, res) => {
  try {
    const { employeeId, basic, hra, conveyance } = req.body;

    // Earnings
    const grossSalary = basic + hra + conveyance;

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
      employeeId,
      basic,
      hra,
      conveyance,
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
