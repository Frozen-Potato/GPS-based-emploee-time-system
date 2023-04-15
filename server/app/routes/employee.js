const express = require('express');
const router = express.Router();
const EmployeeService = require('../services/employee');
const employeeService = new EmployeeService();
const bcrypt = require('bcryptjs');
const config = require('../../config');

router.get('/', async (req, res, next) => {
  
  let employees = await employeeService.getList();

  res.render('index', {
    view: 'employee/list',
    activeItem: '',
    pageTitle: 'Employee',
    employees
  });
});

router.post('/email/:key', async (req, res, next) => {
  let key = req.params.key;
  let email = req.body.email;
  let password = req.body.password;
  let employee = await employeeService.getPasswordfromEmail(email);
  if (key == config.publicAPIKey.key){
    if (employee !== null) {
      let correctPassword = employee.password;
      if(bcrypt.compareSync(password, correctPassword)){
        res.status(200).json({ id : employee.id, success : 'logged in' })
      } 
      else 
      {
        res.status(401).json({errors : "Wrong Password"})
      }

    }
    if (employee == null) {
      res.status(401).json({ errors: "No user found" });
    }
  }

})


module.exports = router;