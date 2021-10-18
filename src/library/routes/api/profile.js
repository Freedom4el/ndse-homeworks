const express = require('express');
const router = express.Router();

router.get('/profile',
function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
    }
    return res.json("unauthorized");
    }
    next();
},
function (req, res) {
    res.json(req.user);
});

module.exports = router;