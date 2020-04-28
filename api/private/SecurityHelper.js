require('dotenv').config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

class SecurityHelper {

    createHash(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
    
    createBcryptHash(password) {
        return bcrypt.hash(password, saltRounds);
    
    }   

    compareHash(userInputPassword, hashFromDB) {
        return bcrypt.compare(userInputPassword, hashFromDB);
    }

}

module.exports = new SecurityHelper();