const express = require('express');
const router = express.Router();

router.get('/profile',
function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect('/login');
    }
    next();
},
function (req, res) {
    res.render('user/profile', { 
        user: req.user,
        title: "Профиль"
    });
});

module.exports = router;