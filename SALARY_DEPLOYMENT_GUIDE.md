# Salary Management System - Deployment & User Guide

**Date:** January 26, 2026

---

## 🚀 Quick Start - Running the Application

### Prerequisites
- Node.js installed
- MongoDB running on `localhost:27017`
- Both backend and frontend folders set up

---

## 📋 Step 1: Start the Backend Server

### Open Terminal and Navigate to Backend:
```bash
cd d:\Tushar01\project1\backend
```

### Install Dependencies (if not already done):
```bash
npm install
```

### Start the Server:
```bash
npm start
```

**Expected Output:**
```
Server running on http://localhost:5000
MongoDB connected
```

✅ Backend is now running!

---

## 📋 Step 2: Start the Frontend Server

### Open a New Terminal and Navigate to React:
```bash
cd d:\Tushar01\project1\react
```

### Install Dependencies (if not already done):
```bash
npm install
```

### Start Development Server:
```bash
npm run dev
```

**Expected Output:**
```
VITE v7.2.4  ready in XXX ms

➜  Local:   http://localhost:5173/
```

✅ Frontend is now running!

---

## 📊 How to Enter Salary Data

### **Step 1: Open Employee Form**
- Open browser to `http://localhost:5173/`
- You'll see the Employee Joining Form

### **Step 2: Register Employee (if not already done)**
1. Fill in all employee details:
   - Employee Name
   - Employee Email (must be @gmail.com)
   - Employee Number (10 digits)
   - Date of Birth (must be 18+ years old)
   - Joining Date
2. Employee Code auto-generates
3. Click **Submit**
4. Employee saved to MongoDB ✅

---

## 💰 Step 3: Enter Salary Information

### **Method 1: Direct Navigation**
1. In the Employee List page, you can see the navigation options
2. Look for a **Salary Master** link or button

### **Method 2: Direct URL**
- Open: `http://localhost:5173/salary`

### **Step 1: Fill Salary Form**
On the Salary Master page, enter:

| Field | Description | Example |
|-------|-------------|---------|
| **Employee Code** | Code of employee to add salary | 3581 |
| **Basic** | Basic monthly salary | 50000 |
| **HRA** | House Rent Allowance | 10000 |
| **Conveyance** | Conveyance Allowance | 2000 |
| **Other Allowance** | Any additional allowance | 1000 |

### **Step 2: Review Calculations**
The form will auto-calculate:
- **Gross Salary** = Basic + HRA + Conveyance + Other Allowance
- **Employee PF** = Basic × 12%
- **Employer PF** = Basic × 12%
- **EPS** = Basic × 8.33%
- **Employee ESIC** (if applicable)
- **Employer ESIC** (if applicable)
- **Net Salary** (Take Home Pay)
- **CTC** (Cost to Company)

### **Step 3: Click Save**
- Click **Save Salary Master** button
- Salary record saved to MongoDB ✅
- Success message appears

---

## 📋 View All Salary Records

### **Method 1: From Salary Master Page**
1. Go to `http://localhost:5173/salary`
2. Click **View Salary List** button

### **Method 2: Direct URL**
- Open: `http://localhost:5173/salary-list`

### **Features on Salary List Page:**

#### **Table View**
Shows all employees' salaries with:
- Employee Code
- Basic Salary
- HRA
- Gross Salary
- Net Salary
- CTC

#### **View Details Button**
- Click **View** button on any row
- Modal popup shows detailed breakdown:
  - **Earnings:** Basic, HRA, Conveyance, Other Allowance
  - **Deductions:** Employee PF, Employee ESIC
  - **Contributions:** Employer PF, Employer ESIC
  - **Summary:** Gross, Deductions, Net Salary, CTC

#### **Delete Button**
- Click **Delete** to remove salary record
- Confirmation dialog appears
- Record deleted from MongoDB

#### **Pagination**
- **Previous** button (disabled on page 1)
- **Next** button to see more records
- Page indicator shows current page

---

## 📱 Complete User Flow

```
START
  ↓
Open Browser → http://localhost:5173
  ↓
[Employee Registration]
→ Fill Employee Form
→ Click Submit
→ Employee saved ✅
  ↓
[Go to Salary Entry]
→ Click "View Employee List"
→ Navigate to Employee List page
  ↓
[Add Salary]
→ Click any link to Salary Master (or visit /salary)
→ Enter Salary Details
→ View Auto-Calculated Values
→ Click "Save Salary Master"
→ Salary saved ✅
  ↓
[View Salaries]
→ Click "View Salary List"
→ See all salary records in table
→ Click "View" to see detailed breakdown
→ Click "Delete" to remove record
→ Use "Previous"/"Next" for pagination
  ↓
END
```

---

## 🔍 API Endpoints Reference

### Employee Endpoints
```
POST   /employees              → Create employee
GET    /employees              → Get all employees (paginated)
GET    /employees/:id          → Get employee by ID
PUT    /employees/:id          → Update employee
DELETE /employees/:id          → Delete employee
```

### Salary Endpoints
```
POST   /salary-master                         → Create salary record
GET    /salary-master                         → Get all salaries (paginated)
GET    /salary-master/:id                     → Get salary by ID
GET    /salary-master/employee/:employeeCode  → Get salary by employee code
PUT    /salary-master/:id                     → Update salary
DELETE /salary-master/:id                     → Delete salary
```

---

## 💾 Database Collections

### MongoDB Collections Created:

#### 1. Employees Collection
```javascript
{
  _id: ObjectId,
  employeeCode: Number,
  employeeName: String,
  employeeEmail: String,
  employeeNumber: String,
  dob: Date,
  joiningDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Salaries Collection
```javascript
{
  _id: ObjectId,
  employeeCode: Number,
  basic: Number,
  hra: Number,
  conveyance: Number,
  otherAllowance: Number,
  grossSalary: Number,
  employeePF: Number,
  employerPF: Number,
  eps: Number,
  epf: Number,
  employeeESIC: Number,
  employerESIC: Number,
  netSalary: Number,
  ctc: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✅ Salary Calculations Explained

### **Earnings (What employee receives as stipend)**
- Basic: Base salary
- HRA: House Rent Allowance (typically 20-50% of basic)
- Conveyance: Transportation allowance
- Other Allowance: Any additional benefits
- **Gross = Basic + HRA + Conveyance + Other Allowance**

### **Deductions (What employer deducts from salary)**
- Employee PF: 12% of basic salary
- Employee ESIC: 0.75% of gross (if gross ≤ ₹21,000)

### **Employer Contributions (What employer pays on behalf of employee)**
- Employer PF: 12% of basic salary
- Employer EPF: Part of employer PF contribution
- Employer ESIC: 3.25% of gross (if gross ≤ ₹21,000)

### **Final Calculations**
- **Net Salary (Take Home)** = Gross - Employee PF - Employee ESIC
- **CTC (Cost to Company)** = Gross + Employer PF + Employer ESIC

---

## 🐛 Troubleshooting

### **Error: Failed to fetch employees**
- ✅ Make sure backend is running on `localhost:5000`
- ✅ Check MongoDB is connected
- ✅ Verify CORS is enabled

### **Error: Salary record not found**
- ✅ Verify employee code is correct
- ✅ Make sure employee is registered first
- ✅ Employee code must match exactly

### **Error: Employee Code already exists**
- ✅ Each employee can only have one salary record
- ✅ Delete existing record and create new one
- ✅ Or use the update API endpoint

### **MongoDB Connection Failed**
- ✅ Ensure MongoDB is running: `mongod`
- ✅ Check connection string: `mongodb://127.0.0.1:27017/employeeDB`
- ✅ Verify MongoDB port 27017 is open

### **Port 5000 Already in Use**
- ✅ Kill existing process using port 5000
- ✅ Or change port in `server.js`

### **Port 5173 Already in Use**
- ✅ Vite will automatically use next available port
- ✅ Check terminal output for actual port number

---

## 📊 Example Salary Calculation

**Input:**
- Employee Code: 3581
- Basic: ₹50,000
- HRA: ₹10,000
- Conveyance: ₹2,000
- Other Allowance: ₹1,000

**Automatic Calculations:**
- Gross Salary = ₹50,000 + ₹10,000 + ₹2,000 + ₹1,000 = **₹63,000**
- Employee PF (12%) = ₹50,000 × 0.12 = **₹6,000**
- Employer PF (12%) = ₹50,000 × 0.12 = **₹6,000**
- EPS (8.33%) = ₹50,000 × 0.0833 = **₹4,165**
- Employee ESIC (0.75%) = ₹63,000 × 0.0075 = **₹472.50**
- Employer ESIC (3.25%) = ₹63,000 × 0.0325 = **₹2,047.50**
- **Total Deduction** = ₹6,000 + ₹472.50 = **₹6,472.50**
- **Net Salary** = ₹63,000 - ₹6,472.50 = **₹56,527.50**
- **CTC** = ₹63,000 + ₹6,000 + ₹2,047.50 = **₹71,047.50**

---

## 🎯 Summary

| Step | Action | URL/Command |
|------|--------|------------|
| 1 | Start Backend | `npm start` (in backend folder) |
| 2 | Start Frontend | `npm run dev` (in react folder) |
| 3 | Register Employee | `http://localhost:5173/` |
| 4 | Enter Salary | `http://localhost:5173/salary` |
| 5 | View Salaries | `http://localhost:5173/salary-list` |
| 6 | View Employee List | `http://localhost:5173/list` |

---

## ✨ Features

✅ **Automatic Calculations** - All salary components calculated automatically  
✅ **MongoDB Storage** - Persistent data storage  
✅ **RESTful API** - Full CRUD operations  
✅ **Responsive UI** - Works on all devices  
✅ **Pagination** - Efficient data loading  
✅ **Error Handling** - User-friendly error messages  
✅ **Data Validation** - Prevents duplicate records  
✅ **Detailed Reports** - View complete salary breakdown  

---

**Your HRMS Salary Management System is Now Ready! 🚀**
