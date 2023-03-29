const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            req.log.error({err, info});
            return res.status(400).json({ errors: err });
        }

        if (!user) {
            return res.status(401).json({ errors: "No user found" });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in!` });
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout();
    return res.status(200).end();
});

module.exports = router;