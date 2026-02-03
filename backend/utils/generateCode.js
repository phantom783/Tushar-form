/* Employee Code Generator Utility */
import Employee from "../models/Employee.js";

export const generateEmployeeCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(1000 + Math.random() * 9000);
    exists = await Employee.exists({ employeeCode: code });
  }

  return code;
};
