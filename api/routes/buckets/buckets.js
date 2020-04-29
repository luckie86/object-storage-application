const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const uuidv4 = require("uuid");

const dbHelper = require('../../private/DBHelper');
const JWTHelper = require('../../private/JWTHelper');

router.use('/', function(req,res,next) {
    console.log(req);
    if (req.headers.token) {
        JWTHelper.decodeJWTwithPromise(req.headers.token)
            .then((token) => {
                req.decodedToken = token;
                next();
                return;
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
        return res.status(200).json({bucketsFromCurrentUser});
    } else {
        res.sendStatus(400);
    }
});

// GET Bucket Objects
router.get('/:id/objects', function(req, res, next) {
    if (req.decodedToken) {
        const bucketUUID = req.params.id;
        const objects = dbHelper.getObjects();
        const objectFormCurrentBucket = objects.filter((object) => {return object.bucketId === bucketUUID});
        return res.status(200).json({objectFormCurrentBucket});
    } else {
        res.sendStatus(400).json({"Erroor": "error"});
    }
});

// POST Bucket
router.post('/save', function (req, res, next) {
    if (req.decodedToken) {
        const currentUserId = req.decodedToken.userId;
        const bucketUUID = uuidv4.v4();
        const locationUUID = uuidv4.v4();
        const newBucket = req.body;
        const save = dbHelper.saveBucket(currentUserId, bucketUUID, newBucket.bucketName, locationUUID, newBucket.bucketLocation);
        if (save) {
            return res.status(200).json({"userId": currentUserId, "id": bucketUUID, "name": newBucket.bucketName, "location": { "id": locationUUID, "name": newBucket.bucketLocation} });
        } 
    } else {
        res.sendStatus(400).json({"error": "error"});
    }
});

// Save Object
router.post('/upload', (req, res, next) => {
    if (req.decodedToken) {
        const bucketId = req.fields.bucketId;
        const objectUUID = uuidv4.v4();
        const name = req.files.uploads.name;
        const modified = req.files.uploads.lastModifiedDate;
        const size = req.files.uploads.size;
        const save = dbHelper.saveObject(bucketId, objectUUID, name, modified, size);
        if (save) {
            return res.status(200).json({"bucketId": bucketId, "name": name, "objectId": objectUUID, "modified": modified, "size": size});
        } else {
            res.sendStatus(400);
        }
    }    
});

// Delete Object
router.delete('/:id/delete', (req, res, next) => {
    if (req.decodedToken) {
        const objectUUID = req.params.id;
        const deleted = dbHelper.deleteObject(objectUUID);
        if (deleted) {
            return res.status(200).json({"status": "Succesfully deleted"});
        } else {
            res.sendStatus(400);
        }
    }    
});

module.exports = router;
