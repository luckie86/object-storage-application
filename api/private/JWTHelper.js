const jwt = require('jsonwebtoken');
const securityHelper = require("../private/SecurityHelper");

const privateKey = process.env.PRIVATE_KEY;
const hashedPrivateKey = securityHelper.createHash(privateKey);

class JWTHelper {

    decodeJWTwithPromise(token) {
        return new Promise (function (resolve, reject) {
            jwt.verify(token, hashedPrivateKey, function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        })
        
    }

    createJWTwithPromise(data) {
        return new Promise(function (resolve, reject) {
            jwt.sign(data, hashedPrivateKey, { algorithm: 'HS256' }, function (err, token) {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })

        });
    }

}

module.exports = new JWTHelper();