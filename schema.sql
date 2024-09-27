-- Create the database (run this if you haven't created the database yet)
-- CREATE DATABASE employees_db;

-- Switch to the employees_db database (you can do this in your psql CLI)
-- \c employees_db;

-- Create departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Create roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    department_id INT REFERENCES departments(id) ON DELETE SET NULL
);

-- Create employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INT REFERENCES employees(id) ON DELETE SET NULL
);