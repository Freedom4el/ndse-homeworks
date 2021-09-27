const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.status(201);
    const user = {
        id: 1, 
        mail: "test@mail.ru"
    };
    res.json(user);
});

module.exports = router;