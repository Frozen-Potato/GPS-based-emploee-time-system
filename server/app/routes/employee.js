const express = require('express');
const router = express.Router();

const EmployeeService = require('../services/employee');
const employeeService = new EmployeeService();

const TimeServices = require('../services/time');
const timeServices = new TimeServices();

const SettingServices = require('../services/settings');
const settingServices = new SettingServices();

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
        return;
      } 
      else 
      {
        res.status(401).json({errors : "Wrong Password"})
        return;
      }

    }
    if (employee == null) {
      res.status(401).json({ errors: "No user found" });
      return;
    }
  }
})

router.post('/time/:key', async (req, res, next) => {
  let key = req.params.key;
  let employeeId = req.body.id;
  let type = req.body.type;
  let time = req.body.time;
  let customTime = req.body.custom_time;
  let location = req.body.location;

  let data = await settingServices.getLocation();

  if (location !== data[0].location){
    res.status(401).json({ errors : "Incorrect Location, could not check in" })
  }

  let Timedata = await timeServices.getDataFromEmployeeId(employeeId);
  console.log(Timedata);

  if (Timedata) {
    let latestTimedata = Timedata[Timedata.length - 1];
    let lasestDate = new Date(latestTimedata.time);
    if (time - lasestDate < 0) {
      res.status(401).json({ errors : "You already checked " + latestTimedata.type + " at " + latestTimedata.time})
      return;
    }

    if (latestTimedata.type == "in"){
      if(type == "out"){
        await timeServices.insertData(employeeId, type, time, customTime);
        res.status(200).json({ success : "checked out" });
        return;
      }

      if(type == "in"){
        res.status(401).json({ errors : "You can't check in twice without check out" })
        return;
      }
    }    

    if(type == "out"){
      res.status(401).json({ errors : "You can't check out twice without check in again" })
      return;
    }

  }

  await timeServices.insertData(employeeId, type, time, customTime);
  res.status(200).json({ success : "checked " + type })
  return;

})


module.exports = router;