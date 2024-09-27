const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;

// Get detailed information about all employees
const getAllEmployeesDetailed = async () => {
  const query = `
    SELECT 
      e.id AS employee_id, 
      e.first_name, 
      e.last_name, 
      r.title AS job_title, 
      d.name AS department, 
      r.salary, 
      COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager
    FROM employees e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id
  `;
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error in getAllEmployeesDetailed:', err);
    throw err;
  }
};

// Get all departments
const getAllDepartments = async () => {
  const query = 'SELECT * FROM departments';
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error in getAllDepartments:', err);
    throw err;
  }
};

// Get all roles
const getAllRoles = async () => {
  const query = 'SELECT * FROM roles';
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error in getAllRoles:', err);
    throw err;
  }
};

// Get all employees
const getAllEmployees = async () => {
  const query = 'SELECT * FROM employees';
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error in getAllEmployees:', err);
    throw err;
  }
};

// Add a department
const addDepartment = async (name) => {
  const query = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
  const values = [name];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];  // Return the inserted row
  } catch (err) {
    console.error('Error in addDepartment:', err);
    throw err;
  }
};

// Add a role
const addRole = async (title, salary, department_id) => {
  const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
  const values = [title, salary, department_id];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];  // Return the inserted row
  } catch (err) {
    console.error('Error in addRole:', err);
    throw err;
  }
};

// Add an employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  const query = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [first_name, last_name, role_id, manager_id || null];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];  // Return the newly added employee
  } catch (err) {
    console.error('Error in addEmployee:', err);
    throw err;
  }
};

// Update an employee's role
const updateEmployeeRole = async (employee_id, role_id) => {
  const query = 'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *';
  const values = [role_id, employee_id];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];  // Return the updated employee
  } catch (err) {
    console.error('Error in updateEmployeeRole:', err);
    throw err;
  }
};

// Update an employee's manager
const updateEmployeeManager = async (employee_id, manager_id) => {
  const query = 'UPDATE employees SET manager_id = $1 WHERE id = $2 RETURNING *';
  const values = [manager_id, employee_id];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];  // Return the updated employee
  } catch (err) {
    console.error('Error in updateEmployeeManager:', err);
    throw err;
  }
};

// Get employees by manager
const getEmployeesByManager = async (manager_id) => {
  const query = `
    SELECT 
      e.id AS employee_id, 
      e.first_name, 
      e.last_name, 
      r.title AS job_title, 
      d.name AS department, 
      r.salary
    FROM employees e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    WHERE e.manager_id = $1
  `;
  const values = [manager_id];
  try {
    const res = await pool.query(query, values);
    return res.rows;
  } catch (err) {
    console.error('Error in getEmployeesByManager:', err);
    throw err;
  }
};

// Delete a department
const deleteDepartment = async (departmentId) => {
  const query = 'DELETE FROM departments WHERE id = $1';
  const values = [departmentId];
  try {
    const res = await pool.query(query, values);
    return res;  // Return the result (could be rowCount)
  } catch (err) {
    console.error('Error in deleteDepartment:', err);
    throw err;
  }
};

// Delete a role
const deleteRole = async (roleId) => {
  const query = 'DELETE FROM roles WHERE id = $1';
  const values = [roleId];
  try {
    const res = await pool.query(query, values);
    return res;  // Return the result (could be rowCount)
  } catch (err) {
    console.error('Error in deleteRole:', err);
    throw err;
  }
};

// Delete an employee
const deleteEmployee = async (employeeId) => {
  const query = 'DELETE FROM employees WHERE id = $1';
  const values = [employeeId];
  try {
    const res = await pool.query(query, values);
    return res;  // Return the result (could be rowCount)
  } catch (err) {
    console.error('Error in deleteEmployee:', err);
    throw err;
  }
};

// Export the functions
module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  getAllEmployeesDetailed,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getEmployeesByManager,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
};
