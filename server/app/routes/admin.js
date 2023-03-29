const express = require('express');
const router = express.Router();
const AdminsService = require('../services/admins');
const adminsService = new AdminsService();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {
  
  let admins = await adminsService.getList();

  res.render('index', {
    view: 'admin/list',
    activeItem: 'admin',
    pageTitle: 'Admins',
    admins
  });
});


module.exports = router;