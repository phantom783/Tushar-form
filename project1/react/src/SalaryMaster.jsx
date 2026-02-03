import { useState } from "react";

function SalaryMaster() {
  const [employeeCode, setEmployeeCode] = useState("");

  const [basic, setBasic] = useState(0);
  const [hra, setHra] = useState(0);
  const [conveyance, setConveyance] = useState(0);
  const [otherAllowance, setOtherAllowance] = useState(0);
  

  const gross =
    Number(basic) +
    Number(hra) +
    Number(conveyance) +
    Number(otherAllowance);

  const employeePF = basic * 0.12;
  const employerPF = basic * 0.12;
  const eps = basic * 0.0833;
  const employerEPF = basic * 0.0367;

  const isESICApplicable = gross <= 21000;
  const employeeESIC = isESICApplicable ? gross * 0.0075 : 0;
  const employerESIC = isESICApplicable ? gross * 0.0325 : 0;

  const totalDeduction = employeePF + employeeESIC;
  const netSalary = gross - totalDeduction;
  const ctc = gross + employerPF + employerESIC;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salaryData = {
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
    };

    try {
      const res = await fetch("http://localhost:5000/employees?dropdown=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salaryData),
      });

      if (!res.ok) throw new Error("Failed to save salary master");

      alert("Salary Master Saved Successfully ✅");
      e.target.reset();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Salary Master</h1>

      <fieldset>
        <legend><strong>Employee Details</strong></legend>

        <label>Employee Code:</label>
        <input
          type="text"
          required
          onChange={(e) => setEmployeeCode(e.target.value)}
        />
      </fieldset>

      <fieldset>
        <legend><strong>Earnings</strong></legend>

        <label>Basic:</label>
        <input type="number" onChange={(e) => setBasic(+e.target.value)} />

        <label>HRA:</label>
        <input type="number" onChange={(e) => setHra(+e.target.value)} />

        <label>Conveyance:</label>
        <input type="number" onChange={(e) => setConveyance(+e.target.value)} />

        <label>Other Allowance:</label>
        <input
          type="number"
          onChange={(e) => setOtherAllowance(+e.target.value)}
        />
      </fieldset>

      <fieldset>
        <legend><strong>Salary Breakdown</strong></legend>

        <p>Gross Salary: ₹{gross.toFixed(2)}</p>

        <p>Employee PF (12%): ₹{employeePF.toFixed(2)}</p>
        <p>Employer PF (12%): ₹{employerPF.toFixed(2)}</p>
        <p>EPS (8.33%): ₹{eps.toFixed(2)}</p>
        <p>Employer EPF (3.67%): ₹{employerEPF.toFixed(2)}</p>

        <p>
          ESIC Applicable:{" "}
          <strong>{isESICApplicable ? "Yes" : "No"}</strong>
        </p>

        <p>Employee ESIC: ₹{employeeESIC.toFixed(2)}</p>
        <p>Employer ESIC: ₹{employerESIC.toFixed(2)}</p>

        <p><strong>Net Salary: ₹{netSalary.toFixed(2)}</strong></p>
        <p><strong>CTC: ₹{ctc.toFixed(2)}</strong></p>
      </fieldset>

      <button type="submit">Save Salary Master</button>
    </form>
  );
}

export default SalaryMaster;
