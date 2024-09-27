INSERT INTO departments (name)
VALUES 
  ('Engineering'),
  ('Finance'),
  ('Human Resources'),
  ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES 
  ('Software Engineer', 90000, 1),
  ('Accountant', 70000, 2),
  ('HR Manager', 80000, 3),
  ('Sales Manager', 85000, 4),
  ('Junior Developer', 60000, 1),
  ('Senior Developer', 120000, 1),
  ('Financial Analyst', 75000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),    
  ('Jane', 'Smith', 2, NULL),  
  ('Robert', 'Brown', 3, NULL), 
  ('Emily', 'Davis', 4, NULL), 
  ('Michael', 'Johnson', 5, 1), 
  ('Sarah', 'Taylor', 6, 1),   
  ('David', 'Williams', 7, 2);