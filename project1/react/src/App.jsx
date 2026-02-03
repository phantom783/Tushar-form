import EmployeeForm from "./main";
import SalaryMaster from "./SalaryMaster";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>HRMS System</h1>

      <section style={{ marginBottom: "40px" }}>
        <EmployeeForm />
      </section>

      <hr />

      <section style={{ marginTop: "40px" }}>
        <SalaryMaster />
      </section>
    </div>
  );
}

export default App;
