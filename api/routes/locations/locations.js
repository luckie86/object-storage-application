const express = require('express');
const router = express.Router();

const dbHelper = require('../../private/DBHelper');
const JWTHelper = require('../../private/JWTHelper');

router.use('/', function(req,res,next){
    if (req.headers.token) {
        JWTHelper.decodeJWTwithPromise(req.headers.token)
            .then((token) => {
                req.decodedToken = token;
                next();
            })
            .catch((err)=> {
                next(err);
            });
    } else {
        next("no token found");
    } 
});

// GET Locations
router.get('/', function(req, res, next) {
    if (req.decodedToken) {
        const locations = dbHelper.getLocations();
        res.status(200).json({locations});
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;
