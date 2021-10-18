const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            user.isPasswordValid(password, function(err, isValid) {
                if (err) {
                    return done(err);
                }
                if (isValid) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: "Invalid password"
                    });
                }
            });
        });
    }
));

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err) }
        cb(null, user);
    });
});

router.use(require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/login',
function (req, res) {
    res.render('user/login', {
        title: "Вход/Регистрация"
    });
});

router.post('/login',
passport.authenticate(
    'local',
    {
        failureRedirect: '/login',
    },
),
function (req, res) {
    res.redirect('/');
});
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        var user = new User(req.body);
        var result = await user.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/logout',
function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;