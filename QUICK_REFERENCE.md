# 🎯 Quick Reference Checklist

## Backend Setup Checklist
- [ ] MongoDB running (`net start MongoDB`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Backend started (`npm start`)
- [ ] Test health endpoint: `GET http://localhost:5000/health`
- [ ] Test create employee: `POST http://localhost:5000/employees`

## Frontend Setup Checklist
- [ ] React dependencies installed (`cd react && npm install`)
- [ ] Redux packages installed (@reduxjs/toolkit, react-redux)
- [ ] Frontend started (`npm run dev`)
- [ ] Redux Provider added to main.jsx (Step 6)
- [ ] Redux store imported correctly

## Component Updates Checklist
- [ ] Update main.jsx with Redux Provider wrapper
- [ ] Update list.jsx to use Redux dispatch/selector
- [ ] Update form component to use createEmployee thunk
- [ ] Add error/success message displays
- [ ] Test create/read/update/delete operations

## API Endpoints Available
```
Employee Endpoints:
✓ POST /employees - Create
✓ GET /employees - Get all (paginated)
✓ GET /employees/:id - Get by ID
✓ PUT /employees/:id - Update
✓ DELETE /employees/:id - Delete
✓ GET /employees?dropdown=true - Get dropdown

Salary Endpoints:
✓ POST /salary-master - Create
✓ GET /salary-master - Get all (paginated)
✓ GET /salary-master/:id - Get by ID
✓ PUT /salary-master/:id - Update
✓ DELETE /salary-master/:id - Delete
```

## ORM Architecture Files Created
```
Backend:
✓ backend/models/Employee.js
✓ backend/repositories/EmployeeRepository.js
✓ backend/repositories/SalaryRepository.js
✓ backend/services/EmployeeService.js
✓ backend/services/SalaryService.js
✓ backend/controllers/EmployeeController.js (updated)
✓ backend/routes/employeeRoutes.js
✓ backend/utils/generateCode.js

Frontend:
✓ react/src/redux/store.js
✓ react/src/redux/slices/employeeSlice.js
✓ react/src/redux/slices/salarySlice.js

Documentation:
✓ ORM_IMPLEMENTATION_GUIDE.md
✓ NEXT_STEPS.md
✓ QUICK_REFERENCE.md (this file)
```

## Common Commands

### Start Services
```bash
# Terminal 1: MongoDB (if not running as service)
mongod

# Terminal 2: Backend
cd backend && npm start

# Terminal 3: Frontend
cd react && npm run dev
```

### Test API with curl
```bash
# Create employee
curl -X POST http://localhost:5000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeName": "Test User",
    "employeeEmail": "test@gmail.com",
    "employeeNumber": "9876543210",
    "dob": "2000-01-15",
    "joiningDate": "2024-01-20"
  }'

# Get all employees
curl http://localhost:5000/employees?page=1&limit=5

# Get dropdown
curl http://localhost:5000/employees?dropdown=true
```

## Files to Update Next
1. **react/src/main.jsx** - Add Redux Provider
2. **react/src/list.jsx** - Use Redux for employee list
3. **react/src/main.jsx (Form)** - Use Redux for create
4. **react/src/SalaryMaster.jsx** - Use Redux for salary (optional)

## Key Redux Patterns

### Dispatch Action
```javascript
dispatch(fetchEmployees({ page: 1, limit: 5 }));
dispatch(createEmployee(formData));
dispatch(updateEmployee({ id, data }));
dispatch(deleteEmployee(id));
```

### Access State
```javascript
const { data, loading, error, success } = useSelector(state => state.employees);
```

### Clear Messages
```javascript
dispatch(clearError());
dispatch(clearSuccess());
```

## Debugging Tips

### Check Backend Logs
```
✓ Server running on http://localhost:5000
✓ MongoDB connected
[POST] /employees - Employee created
```

### Check Redux State (DevTools)
- Install Redux DevTools Chrome extension
- Open DevTools → Redux tab
- Watch state changes in real-time
- Time-travel through actions

### Check Network (Browser DevTools)
- Open DevTools → Network tab
- Filter by XHR/Fetch
- Click request to see headers and response

### Common Error Messages
```
"Employee must be at least 18 years old" → Check DOB
"CORS error" → Check backend CORS middleware
"Cannot find module" → Check import paths
"MongoDB connection error" → Start MongoDB
```

## Success Indicators
- ✅ Backend running without errors
- ✅ Frontend loads without errors
- ✅ Can create employee via form
- ✅ Employee list updates automatically
- ✅ Edit/Delete buttons work
- ✅ Redux DevTools shows state changes
- ✅ No console errors

---

**Ready to proceed? Follow NEXT_STEPS.md starting from Step 6!**
