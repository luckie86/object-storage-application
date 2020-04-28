const express = require('express');
const router = express.Router();

const dbHelper = require('../../private/DBHelper');

router.get('/', function(req, res, next) {
    const users = dbHelper.getUsers(); 
    res.status(200).send(users);
});

router.get('/:id', function(req, res, next) {
    const id = parseInt(req.params.id, 10);
    if (!typeof id == "number" || id !== null) { 
        const users = dbHelper.getUsers();
        const user = users.find((user) => user.id === id) || {};
        return res.status(200).send(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
