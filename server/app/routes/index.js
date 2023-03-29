const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    view: 'default'
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  return res.redirect('/login');
});

router.get('/me', (req, res, next) => {
  return res.redirect('/account');
});


module.exports = router;
