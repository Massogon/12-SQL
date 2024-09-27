# Employee Tracker

## Description

The **Employee Tracker** is a command-line application that allows you to manage and track employees, departments, and roles within a company. The application provides a content management system (CMS) interface to interact with an employee database, allowing you to view, add, update, and delete employee information.

The project uses **Node.js**, **Inquirer**, and **PostgreSQL** to build a powerful but simple solution for managing a company's workforce.

---

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/employee-tracker.git
cd employee-tracker
```

### Step 2: Install dependencies

Run the following command to install the necessary Node.js packages:

```bash
npm install
```

### Step 3: Configure PostgreSQL

Create the PostgreSQL database:

Open the PostgreSQL CLI (psql) and run the following commands to create a new database:

```sql
CREATE DATABASE employees_db;
```

Run the schema:

Run the schema.sql file to set up the database structure:

```bash
psql -U your_username -d employees_db -f db/schema.sql
```

(Optional) Seed the database:

If you want to insert some initial data into the database, run the following command:

```bash
psql -U your_username -d employees_db -f db/seeds.sql
```

### Step 4: Set up environment variables

Create a `.env` file in the root of your project and add your PostgreSQL connection details:

```bash
DB_HOST=localhost
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=employees_db
DB_PORT=5432
```

---

## Usage

### Step 1: Start the application

After configuring the database and environment variables, start the application with the following command:

```bash
npm start
```

### Step 2: Interact with the application

You'll be presented with a menu that allows you to:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role
- Update an employee's manager
- View employees by manager
- Delete departments, roles, or employees

### Step 3: Exit the application

To exit, choose the "Exit" option in the main menu.

---

## Database Schema

The database consists of three tables: departments, roles, and employees.

**departments:**
- `id`: Unique identifier for each department.
- `name`: Name of the department (e.g., Engineering, Sales).

**roles:**
- `id`: Unique identifier for each role.
- `title`: Job title (e.g., Software Engineer, Accountant).
- `salary`: Salary for the role.
- `department_id`: Foreign key referencing the department this role belongs to.

**employees:**
- `id`: Unique identifier for each employee.
- `first_name`: Employee's first name.
- `last_name`: Employee's last name.
- `role_id`: Foreign key referencing the role the employee has.
- `manager_id`: Foreign key referencing the employee's manager (optional, can be NULL).

---

## Features

- **View Employees, Roles, and Departments**: Easily view the full list of employees, roles, or departments with their associated information.
- **Add Employees, Roles, and Departments**: Quickly add new employees, roles, and departments.
- **Update Employee Information**: Update an employee's role or manager.
- **Delete Employees, Roles, and Departments**: Delete existing employees, roles, or departments.
- **View Employees by Manager**: See which employees report to a specific manager.

---

## Future Enhancements

- **Search functionality**: Add the ability to search for employees by name.
- **Advanced role management**: Assign multiple roles to employees and track their history within the company.
- **Performance reports**: Generate employee performance reports based on various metrics.

---

## Contributing

Feel free to submit pull requests or issues if you have any suggestions for improvement or find any bugs. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit the changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new pull request.

---

## License

This project is licensed under the MIT License.
