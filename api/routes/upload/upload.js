const express = require("express");
const formidableMiddleware  = require("express-formidable");
const app = express();

app.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: __dirname + '/uploads',
    multiples: true, // req.files to be arrays of files
    keepExtensions: true
}));

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