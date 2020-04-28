const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({dest: '../../uploads/'});

const uuidv4 = require("uuid");

const dbHelper = require('../../private/DBHelper');
const JWTHelper = require('../../private/JWTHelper');

router.post("/buckets", upload.single("fileToSave") ,function(req, res, next) {
    
});

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

// GET Buckets
router.get('/', function(req, res, next) {
    if (req.decodedToken) {
        const buckets = dbHelper.getBuckets();
        const bucketsFromCurrentUser = buckets.filter((bucket) => {return bucket.userId === req.decodedToken.userId});
        res.status(200).json({bucketsFromCurrentUser});
    } else {
        res.sendStatus(400);
    }
});

// POST Bucket
router.post('/save', function (req, res, next) {
    const currentUserId = req.decodedToken.userId;
    const bucketUUID = uuidv4.v4();
    const locationUUID = uuidv4.v4();
    const newBucket = req.body;
    const save = dbHelper.saveBucket(currentUserId, bucketUUID, newBucket.bucketName, locationUUID, newBucket.bucketLocation);
    if (save) {
        return res.status(200).send({message: "Bucket sucesfully saved"});
    } else {
        return res.sendStatus(400);
    }
});


module.exports = router;
