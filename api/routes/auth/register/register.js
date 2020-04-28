const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid");

const dbHelper = require("../../../private/DBHelper");
const securityHelper = require("../../../private/SecurityHelper");
const JWTHelper = require("../../../private/JWTHelper");

router.post('/', function(req, res, next) {
    const data = req.body;
    const timeStamp = new Date(Date.now());
    securityHelper.createBcryptHash(data.password).then((hashedPassword) => {
        if (data) {
            let newUserId = uuidv4.v4();
            dbHelper.updateModel({id: newUserId, user: data.userName, password: hashedPassword, timestamp: timeStamp}, null);
            let userToken = {
                userId: newUserId,
                userName: data.userName,
            }
            
            JWTHelper.createJWTwithPromise(userToken)
                .then((token) => {
                    res.status(200).send({token});
                })
                .catch((err)=> {
                    res.status(400).send(err);
                });
        }
    }).catch((err) => {
        console.log(err);
    });
    
});

module.exports = router;
