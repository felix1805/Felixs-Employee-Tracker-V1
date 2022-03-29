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

    
};
const userAddEmployee = () => {

   
};
const userUpdateRole = () => {

   
};
employeeMenu();