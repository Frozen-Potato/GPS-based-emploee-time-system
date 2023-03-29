const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        view: 'account/index',
        htmlTitle: 'Account',
        pageTitle: 'Your Account'
      });
});

module.exports = router;