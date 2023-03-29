const express = require('express');
const router = express.Router();
const EmployeeService = require('../services/employee');
const employeeService = new EmployeeService();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {
  
  let employees = await employeeService.getList();

  res.render('index', {
    view: 'employee/list',
    activeItem: '',
    pageTitle: 'Employee',
    employees
  });
});


module.exports = router;