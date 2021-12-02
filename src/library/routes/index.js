require("reflect-metadata");
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {
        title: "Библиотека",
    });
});

module.exports = router;