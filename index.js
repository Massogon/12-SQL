]);

const employeesByManager = await db.getEmployeesByManager(answers.manager_id);
console.table(employeesByManager);
} catch (err) {
console.error('Error viewing employees by manager:', err);
}
};

const deleteMenu = async () => {
const deleteOptions = [
'Delete a Department',
'Delete a Role',
'Delete an Employee',
'Back to Main Menu'
];
const deleteDepartment = async () => {
try {
  const departments = await db.getAllDepartments();
  const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

  const answers = await inquirer.prompt([
    {
      name: 'department_id',
      type: 'list',
      message: 'Select the department to delete:',
      choices: departmentChoices
    }
  ]);

  await db.deleteDepartment(answers.department_id);
  console.log('Department deleted successfully!\n');
} catch (err) {
  console.error('Error deleting department:', err);
}
};

const deleteRole = async () => {
try {
  const roles = await db.getAllRoles();
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

  const answers = await inquirer.prompt([
    {
      name: 'role_id',
      type: 'list',
      message: 'Select the role to delete:',
      choices: roleChoices
    }
  ]);

  await db.deleteRole(answers.role_id);
  console.log('Role deleted successfully!\n');
} catch (err) {
  console.error('Error deleting role:', err);
}
};

const deleteEmployee = async () => {
try {
  const employees = await db.getAllEmployees();
  const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

  const answers = await inquirer.prompt([
    {
      name: 'employee_id',
      type: 'list',
      message: 'Select the employee to delete:',
      choices: employeeChoices
    }
  ]);

  await db.deleteEmployee(answers.employee_id);
  console.log('Employee deleted successfully!\n');
} catch (err) {
  console.error('Error deleting employee:', err);
}
};

const deleteChoice = await inquirer.prompt([
{
  type: 'list',
  name: 'deleteOption',
  message: 'What do you want to delete?',
  choices: deleteOptions
}
]);

switch (deleteChoice.deleteOption) {
case 'Delete a Department':
  await deleteDepartment();
  break;
case 'Delete a Role':
  await deleteRole();
  break;
case 'Delete an Employee':
  await deleteEmployee();
  break;
case 'Back to Main Menu':
  return; // Return to main menu
}

await deleteMenu(); // Recursively call deleteMenu to allow for continuous deletion
};

mainMenu();
