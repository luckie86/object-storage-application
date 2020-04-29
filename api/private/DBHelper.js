const fs = require("fs");

class DBHelper {

    constructor() {
        this.model = null;
        this.loadModel();
    }

    loadModel() {
        fs.readFile('DB.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
           }
            this.model = JSON.parse(data);
        });
    }
    
    setModel (model) {
        this.model = model;
    }

    getModel () {
        if (!this.model) {
            fs.readFile('DB.json', 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                this.model = JSON.parse(data);
                return this.model;
            });
        }
        return this.model;
    }

    saveModel (model) {
        let json = JSON.stringify(model);
        fs.writeFile('DB.json', json, 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Model has been saved");
            }
                
        });
    }

    updateModel (user, todo) {
        let currentModel = this.model;
        if (user) {
            currentModel.users.push(user)
        } else if (todo) {
            currentModel.todos.push(todo);
        } 
        this.saveModel(currentModel);
    }

    getUsers () {
        if (!this.model) {
            this.getModel();
            return this.model.users;
        } else {
            return this.model.users;
        }
    }

    getBuckets () {
        if (!this.model) {
            this.getModel();
            return this.model.buckets;
        } else {
            return this.model.buckets;
        }    
    }

    getObjects () {
        if (!this.model) {
            this.getModel();
            return this.model.objects;
        } else {
            return this.model.objects;
        }    
    }

    getLocations () {
        if (!this.model) {
            this.getModel();
            return this.model.locations;
        } else {
            return this.model.locations;
        }    
    }

    saveBucket(currentUserId, bucketUUID, bucketName, locationUUID, locationName) {
        if(!currentUserId || !bucketUUID || !bucketName || !locationUUID || !locationName) {
            return false;
        } else {
            this.model.buckets.push({"userId": currentUserId, "id": bucketUUID, "name": bucketName, "location": {"id": locationUUID, "name": locationName }});
            this.saveModel(this.model);
            return true;
        }
    }

    saveObject(bucketId, objectUUID, name, modified, size) {
        if(!bucketId || !name || !modified || !size || !objectUUID) {
            return false;
        } else { 
            this.model.objects.push({"bucketId": bucketId, "objectId": objectUUID, "name": name, "modified": modified, "size": size});
            this.saveModel(this.model);
            return true;
        }
    }

    deleteObject(objectUUID) {
        if(!objectUUID) {
            return false;
        } else {
            let currentModel = this.model;
            let newObjects = currentModel.objects.filter((object) => object.objectId !== objectUUID);
            currentModel.objects = newObjects;
            this.saveModel(currentModel);
            return true;  
        }
    }

}

module.exports = new DBHelper();
