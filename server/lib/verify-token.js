var jwt      = require('jsonwebtoken');
var secret   = process.env.JWT_SECRET || require("../../credentials.json").secret;

function verify(token) {
    var decoded = false;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        decoded = false;
    }
    return decoded;
}

module.exports = verify;