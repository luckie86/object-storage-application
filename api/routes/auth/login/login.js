const express = require("express");
const router = express.Router();

const dbHelper = require("../../../private/DBHelper");
const securityHelper = require("../../../private/SecurityHelper");
const JWTHelper = require("../../../private/JWTHelper");

router.post('/', function(req, res, next) {
    let userName = req.body.userName;
    let password = req.body.password;
    let users = dbHelper.getUsers();
    let user = users.find((user) => user.user === userName);
    if (user) {
        securityHelper.compareHash(password, user.password)
        .then((isPasswordValid) => {
            if(isPasswordValid) {
                let userToken = {
                    userId: user.id,
                    userName: user.user,
                }
                
                 JWTHelper.createJWTwithPromise(userToken)
                    .then((token) => {
                        res.status(200).send({token});
                    })
                    .catch((err)=> {
                        res.status(400).send(err);
                    });
            } else {
                throw "invalid login";

            }
    
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
        

    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
