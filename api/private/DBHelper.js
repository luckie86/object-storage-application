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
        fs.writeFile('DB.json', json, 'utf8', (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
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

}

module.exports = new DBHelper();
