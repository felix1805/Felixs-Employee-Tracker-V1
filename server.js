const inquirer = require('inquirer');
const fs = require("fs");
const mysql = require('mysql2');
require('console.table');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employeeDb',
    password: ''
});

const employeeMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'Menu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
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
    connect.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results);
            employeeMenu();
        });
};

const chooseRoles = () => {

    employeeMenu()
};
const chooseEmployees = () => {

    employeeMenu()
};
const userAddDepartment = () => {

    employeeMenu()
};
const userAddRole = () => {

    employeeMenu()
};
const userAddEmployee = () => {

    employeeMenu()
};
const userUpdateRole = () => {

    employeeMenu()
};