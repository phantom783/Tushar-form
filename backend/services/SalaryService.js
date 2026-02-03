/* Salary Service - Business Logic Layer */
import SalaryRepository from "../repositories/SalaryRepository.js";

class SalaryService {
  // Create salary master
  async createSalary(salaryData) {
    const { employeeCode } = salaryData;

    // Check if salary already exists
    const existing = await SalaryRepository.existsByCode(employeeCode);
    if (existing) {
      throw new Error("Salary master already exists for this employee");
    }

    return await SalaryRepository.create(salaryData);
  }

  // Get salary by ID
  async getSalaryById(id) {
    const salary = await SalaryRepository.findById(id);
    if (!salary) {
      throw new Error("Salary record not found");
    }
    return salary;
  }

  // Get salary by employee code
  async getSalaryByEmployeeCode(code) {
    const salary = await SalaryRepository.findByEmployeeCode(code);
    if (!salary) {
      throw new Error("Salary record not found");
    }
    return salary;
  }

  // Get all salaries with pagination
  async getAllSalaries(page = 1, limit = 10) {
    return await SalaryRepository.findAll(page, limit);
  }

  // Update salary by ID
  async updateSalary(id, updateData) {
    const updated = await SalaryRepository.updateById(id, updateData);
    if (!updated) {
      throw new Error("Salary record not found");
    }
    return updated;
  }

  // Update salary by employee code
  async updateSalaryByCode(code, updateData) {
    const updated = await SalaryRepository.updateByEmployeeCode(code, updateData);
    if (!updated) {
      throw new Error("Salary record not found");
    }
    return updated;
  }

  // Delete salary by ID
  async deleteSalary(id) {
    const deleted = await SalaryRepository.deleteById(id);
    if (!deleted) {
      throw new Error("Salary record not found");
    }
    return deleted;
  }

  // Delete salary by employee code
  async deleteSalaryByCode(code) {
    const deleted = await SalaryRepository.deleteByEmployeeCode(code);
    if (!deleted) {
      throw new Error("Salary record not found");
    }
    return deleted;
  }

  // Calculate CTC
  calculateCTC(basic, employerPF, employerESIC) {
    return basic + employerPF + employerESIC;
  }

  // Calculate net salary
  calculateNetSalary(gross, employeePF, employeeESIC) {
    return gross - employeePF - employeeESIC;
  }
}

export default new SalaryService();
