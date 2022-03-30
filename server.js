const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employeeDb',
});

const employeeMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'exit']
        }])
        .then(userInput => {
            switch (userInput.menu) {
                case 'View All Departments':
                    chooseDepartments();
                    break;
                case 'View All Roles':
                    chooseRoles();
                    break;
                case 'View All Employees':
                    chooseEmployees();
                    break;
                case 'Add A Department':
                    userAddDepartment();
                    break;
                case 'Add A Role':
                    userAddRole();
                    break;
                case 'Add An Employee':
                    userAddEmployee();
                    break;
                case 'Update An Employee Role':
                    userUpdateRole();
                    break;
                default:
                    process.exit();
            }
        });
};

const chooseDepartments = () => {
    connection.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results);
            employeeMenu();
        })
};

const chooseRoles = () => {
    connection.query(
        'SELECT * FROM role;',
        (err, results) => {
            console.table(results);
            employeeMenu();
        })

};
const chooseEmployees = () => {
    connection.query(
        `SELECT * FROM employee
        INNER JOIN role
        ON employee.
        role_id = role.id
        LEFT JOIN
        department
        ON role.
        department_id =
        department.id;
        `,
        (err, results) => {
            console.table(results);
            employeeMenu();
        })

};
const userAddDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the new department called?'
        }
    ])
        .then(name => {
            connection.query('INSERT INTO department SET ?', name);
            chooseDepartments();
        })

};
const userAddRole = () => {
    connection.promise().query(`SELECT department.id, department.name FROM department;`)
        .then(([departmentList]) => {
            let selectDepartment = departmentList.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'what is the new roll called?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'what is the new rolls salary?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'what is the new rolls department?',
                    choices: selectDepartment
                }
            ])
                .then(({ title, department, salary }) => {
                    connection.query(`INSERT INTO role SET ?`, {
                        title: title,
                        department_id: department,
                        salary: salary
                    });
                    chooseRoles()

                })
        });
};
const userAddEmployee = () => {
    connection.promise().query(`SELECT role.id, role.title FROM role;`)
        .then(([employeeList]) => {
            let rolesEmployees = employeeList.map(({
                id,
                title
            }) => ({
                value: id,
                name: title
            }))
            connection.promise().query(`SELECT employee.id, CONCAT(employee.first_name,' ',employee.last_name) AS manager FROM employee;`)
                .then(([newManagers]) => {
                    let selectManager = newManagers.map(({
                        id,
                        manager
                    }) => ({
                        value: id,
                        name: manager
                    }));
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'what is the first name of your new employee?'
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'what is the last name of your new employee?'
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'what is the roll of your new employee?',
                            choices: rolesEmployees
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the new employees manager?',
                            choices: selectManager
                        }
                    ])
                        .then(({ firstName, lastName, role, manager }) => {
                            connection.query(`INSERT INTO employee SET ?`, {
                                first_Name: firstName,
                                last_name: lastName,
                                role_id: role,
                                manager_id: manager
                            });
                            chooseEmployees()
                        });
                    ;
                })
        })
};
const userUpdateRole = () => {


};
employeeMenu();