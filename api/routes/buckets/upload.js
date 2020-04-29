const express = require('express');
const router = express.Router();
const uuidv4 = require("uuid");

const dbHelper = require('../../private/DBHelper');

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

module.exports = router;