# ORM Implementation Guide

## Overview
This project now uses a complete ORM (Object-Relational Mapping) pattern with clear separation of concerns:

```
Frontend (React) ← API Calls → Backend (Node.js/Express)
    ↓                              ↓
Redux Store                  Service Layer (Business Logic)
    ↓                              ↓
API Calls                    Repository Layer (Data Access)
                                   ↓
                            Mongoose Models (ODM)
                                   ↓
                            MongoDB Database
```

## Backend Architecture

### 1. **Models** (Data Structure)
- `models/salary.js` - Mongoose schema for Employee and Salary data

### 2. **Repositories** (Data Access Layer)
Located in `backend/repositories/`

#### EmployeeRepository.js
- `create(employeeData)` - Create new employee
- `findById(id)` - Find by MongoDB ID
- `findByEmployeeCode(code)` - Find by employee code
- `findAll(page, limit)` - Get paginated employees
- `findAllSimple()` - Get simple employee list
- `updateById(id, data)` - Update by ID
- `updateByEmployeeCode(code, data)` - Update by code
- `deleteById(id)` - Delete by ID
- `deleteByEmployeeCode(code)` - Delete by code
- `existsByCode(code)` - Check existence

#### SalaryRepository.js
- Similar CRUD operations for Salary data
- `create(salaryData)` - Create salary master
- `findById(id)` - Find by ID
- `findByEmployeeCode(code)` - Find by employee code
- `findAll(page, limit)` - Get paginated records
- `updateById(id, data)` - Update by ID
- `deleteById(id)` - Delete by ID
- `existsByCode(code)` - Check existence

### 3. **Services** (Business Logic Layer)
Located in `backend/services/`

#### EmployeeService.js
- `createEmployee(data)` - Create with validation
- `getEmployeeById(id)` - Retrieve employee
- `getEmployeeByCode(code)` - Retrieve by code
- `getAllEmployees(page, limit)` - Get all with pagination
- `getEmployeeDropdown()` - Get dropdown list
- `updateEmployee(id, data)` - Update with validation
- `deleteEmployee(id)` - Delete employee
- `employeeCodeExists(code)` - Check code existence

#### SalaryService.js
- `createSalary(data)` - Create with duplicate check
- `getSalaryById(id)` - Retrieve salary
- `getSalaryByEmployeeCode(code)` - Retrieve by code
- `getAllSalaries(page, limit)` - Get all with pagination
- `updateSalary(id, data)` - Update salary
- `updateSalaryByCode(code, data)` - Update by code
- `deleteSalary(id)` - Delete salary
- `deleteSalaryByCode(code)` - Delete by code
- `calculateCTC()` - Business logic for CTC calculation
- `calculateNetSalary()` - Business logic for net salary

### 4. **Controllers** (API Endpoints)
Located in `backend/controllers/`

#### EmployeeController.js
- `POST /employees` - Create employee
- `GET /employees/:id` - Get by ID
- `GET /employees?page=x&limit=y` - Get paginated list
- `GET /employees?dropdown=true` - Get dropdown list
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

#### salarycontroller.js (Updated)
- Now uses SalaryService
- CRUD operations for salary management

## Frontend Architecture

### 1. **Redux Store** (`src/redux/`)

#### Configuration (`store.js`)
```javascript
configureStore({
  reducer: {
    employees: employeeReducer,
    salaries: salaryReducer,
  }
})
```

#### Employee Slice (`slices/employeeSlice.js`)
- **State**:
  - `data[]` - Array of employees
  - `dropdown[]` - Dropdown list
  - `loading` - Loading status
  - `error` - Error messages
  - `currentPage` - Current pagination
  - `totalPages` - Total pages
  - `totalEmployees` - Total count

- **Async Thunks**:
  - `fetchEmployees({ page, limit })`
  - `fetchEmployeeDropdown()`
  - `createEmployee(data)`
  - `updateEmployee({ id, data })`
  - `deleteEmployee(id)`

- **Reducers**:
  - `clearError()` - Clear error state
  - `clearSuccess()` - Clear success state

#### Salary Slice (`slices/salarySlice.js`)
- Similar structure for salary management
- **Async Thunks**:
  - `fetchSalaries({ page, limit })`
  - `createSalary(data)`
  - `updateSalary({ id, data })`
  - `deleteSalary(id)`

### 2. **Usage in React Components**

```javascript
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, createEmployee } from "../../redux/slices/employeeSlice";

function MyComponent() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees({ page: 1, limit: 5 }));
  }, [dispatch]);

  const handleCreate = (employeeData) => {
    dispatch(createEmployee(employeeData));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render employees */}</div>;
}
```

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm start  # or npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup
```bash
cd react
npm install  # This will install @reduxjs/toolkit, react-redux, etc.
npm run dev  # Start development server
```

## Data Flow Example

### Creating an Employee:

1. **Frontend**: User submits form
2. **React Component**: Dispatches `createEmployee(formData)`
3. **Redux Thunk**: Makes API call to `POST /employees`
4. **Controller**: Receives request
5. **Service**: Validates data (e.g., age check)
6. **Repository**: Calls Mongoose to save to MongoDB
7. **Response**: Returns created employee
8. **Redux**: Updates state
9. **Component**: Re-renders with new data

## API Endpoints

### Employee Endpoints
```
POST   /employees                    # Create employee
GET    /employees                    # Get all (paginated)
GET    /employees?dropdown=true      # Get dropdown list
GET    /employees/:id                # Get by ID
PUT    /employees/:id                # Update employee
DELETE /employees/:id                # Delete employee
```

### Salary Endpoints
```
POST   /salary-master                # Create salary
GET    /salary-master                # Get all (paginated)
GET    /salary-master/:id            # Get by ID
PUT    /salary-master/:id            # Update salary
DELETE /salary-master/:id            # Delete salary
```

## Benefits of this ORM Architecture

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Reusability**: Services can be used by multiple controllers
3. **Testability**: Each layer can be tested independently
4. **Maintainability**: Changes to database don't affect controllers
5. **Consistency**: Centralized business logic
6. **Scalability**: Easy to add new features
7. **State Management**: Redux provides predictable state updates
8. **Type Safety**: Clear interfaces between layers

## Key Patterns Used

1. **Repository Pattern**: Abstracts data access
2. **Service Layer Pattern**: Encapsulates business logic
3. **Dependency Injection**: Services are singletons
4. **Redux Toolkit**: Simplified Redux state management
5. **Async Thunks**: Handle asynchronous API calls
6. **Middleware**: Express middleware for API handling

## Next Steps

1. Install dependencies:
   ```bash
   cd react && npm install
   ```

2. Update your React components to use Redux (examples in comments)

3. Update the backend server.js to use new routes with controllers

4. Test all endpoints

## Troubleshooting

- **Employee not found**: Check MongoDB connection and employee code
- **Validation errors**: Check age requirement (must be 18+ at joining)
- **Redux state not updating**: Ensure thunks are dispatched correctly
- **API call failures**: Check CORS settings and API URL in Redux slices
