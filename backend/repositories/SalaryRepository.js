/* Salary Repository - Data Access Layer */
import Salary from "../models/salary.js";

class SalaryRepository {
  // Create salary master
  async create(salaryData) {
    try {
      const salary = new Salary(salaryData);
      return await salary.save();
    } catch (error) {
      throw new Error(`Failed to create salary master: ${error.message}`);
    }
  }

  // Find salary by ID
  async findById(id) {
    try {
      return await Salary.findById(id);
    } catch (error) {
      throw new Error(`Failed to find salary: ${error.message}`);
    }
  }

  // Find salary by Employee Code
  async findByEmployeeCode(code) {
    try {
      return await Salary.findOne({ employeeCode: code });
    } catch (error) {
      throw new Error(`Failed to find salary: ${error.message}`);
    }
  }

  // Find all salary records with pagination
  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const salaries = await Salary.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const total = await Salary.countDocuments();
      return { salaries, total, page, limit };
    } catch (error) {
      throw new Error(`Failed to fetch salaries: ${error.message}`);
    }
  }

  // Update salary by ID
  async updateById(id, updateData) {
    try {
      return await Salary.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update salary: ${error.message}`);
    }
  }

  // Update salary by Employee Code
  async updateByEmployeeCode(code, updateData) {
    try {
      return await Salary.findOneAndUpdate(
        { employeeCode: code },
        updateData,
        { new: true }
      );
    } catch (error) {
      throw new Error(`Failed to update salary: ${error.message}`);
    }
  }

  // Delete salary by ID
  async deleteById(id) {
    try {
      return await Salary.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Failed to delete salary: ${error.message}`);
    }
  }

  // Delete salary by Employee Code
  async deleteByEmployeeCode(code) {
    try {
      return await Salary.findOneAndDelete({ employeeCode: code });
    } catch (error) {
      throw new Error(`Failed to delete salary: ${error.message}`);
    }
  }

  // Check if salary exists for employee
  async existsByCode(code) {
    try {
      return await Salary.exists({ employeeCode: code });
    } catch (error) {
      throw new Error(`Failed to check salary existence: ${error.message}`);
    }
  }
}

export default new SalaryRepository();
