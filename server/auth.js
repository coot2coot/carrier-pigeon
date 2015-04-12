var qs   = require('querystring');
var fs   = require('fs');
var path = require('path');
var jwt  = require('jsonwebtoken');
var fs = require('fs');


var secret = process.env.JWT_SECRET || require("../credentials.json").secret;

var index = fs.readFileSync('./public/index.html');

var fakeUser = { 
    username: 'username', 
    password: 'password' 
};

var fakeAdmin = { 
    username: 'Admin', 
    password: '1234' 
};

// TODO: generate a more secure one. Nelson recommends crypto
function generateGUID() {
    return new Date().getTime();
}

function generateToken(req, GUID) {
    var token = jwt.sign({
        auth:  GUID,
        agent: req.headers['user-agent'],
        exp:   new Date().getTime() + 7*24*60*60*1000
    }, secret);
    return token;
}

function storageScript (storageType, value) {
    return script = '<script>' +
                        'if(typeof(Storage) !== "undefined") {' +
                            storageType + 'Storage.setItem("token","' + value + '")' +
                        '}' +
                        'window.location="/#/orders";' +
                    '</script>';
}

module.exports = {
    success: function (req, res, remember) {
        var GUID   = generateGUID();
        var token  = generateToken(req, GUID);
        var record = {
            "valid" : true,
            "created" : new Date().getTime()
        };
        
        //TODO: client side ajax to this, get the token, then save in Local storage
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Authorization': token
        });

        if (remember) {
            res.write(storageScript('local', token));
        } else {
            res.write(storageScript('session', token));
        }

        return res.end("hello")
    },
    validate: function (req, res, remember) {
        // Is validated?
        // return Username for front page
        // Is admin?
    }, 
    //TODO: Make this connect to the real database
    inDatabase: function (user) {
        if ((user.username === fakeUser.username && 
            user.password === fakeUser.password) || 
            (user.username === fakeAdmin.username && 
            user.password === fakeAdmin.password)) {
            return true;
        } else {
            return false;
        }
    }
}

















// function verify(token) {
//     var decoded = false;
//     try {
//         decoded = jwt.verify(token, secret);
//     } catch (e) {
//         decoded = false;
//     }
//     return decoded;
// }

// function private(res, token) {
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//         'authorization': token
//     });
//     return res.end(restricted);
// }

// function validate(req, res, callback) {
//     var token = req.headers.authorization;
//     var decoded = verify(token);

//     if(!decoded || !decoded.auth) {
//         authFail(res);
//         return callback(res);
//     } else {
//     // check if a key exists, else import word list:
//     db.get(decoded.auth, function (err, record) {
//       var r;
//       try {
//         r = JSON.parse(record);
//       } catch (e) {
//         r = { valid : false };
//       }
//       if (err || !r.valid) {
//         authFail(res);
//         return callback(res);
//       } else {
//         privado(res, token);
//         return callback(res);
//       }
//     });
//   }
// }

// function logout(req, res, callback) {
//     // invalidate the token
//     var token = req.headers.authorization;
//     // console.log(' >>> ', token)
//     var decoded = verify(token);
//     if(decoded) {
//         db.get(decoded.auth, function(err, record){
//             var updated    = JSON.parse(record);
//             updated.valid  = false;
//             db.put(decoded.auth, updated, function (err) {
//                 // console.log('updated: ', updated)
//                 res.writeHead(200, {'Content-Type': 'text/plain'});
//                 res.end('Logged Out!');
//                 return callback(res);
//             });
//          });
//     } else {
//         authFail(res, done);
//         return callback(res);
//     }
// }