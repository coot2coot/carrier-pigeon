var fs       = require('fs');
var path     = require('path');
var jwt      = require('jsonwebtoken');
var secret   = process.env.JWT_SECRET || require("../credentials").secret;
var index    = fs.readFileSync('./public/index.html');
var Cookies   = require('cookies');

//HELPER FUNCTIONS:
var authFailed  = require('./lib/auth-failed.js');
var getFormData = require('./lib/get-form-data.js');
var getUser     = require('./lib/select-user-db.js');


function checkIfUserExists(req, res, cb) {
    getFormData(req, function(logins) {
        getUser(logins.username, logins.password, cb);
    })
}


// TODO: generate a more secure one. Nelson recommends crypto
function generateGUID() {
    return new Date().getTime();
}

function generateToken(req, GUID) {
    var token = jwt.sign({
        auth:  GUID,
        exp:   new Date().getTime() + 7*24*60*60*1000
    }, secret);
    return token;
}

function verify(token) {
    var decoded = false;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        decoded = false;
    }
    return decoded;
}

var auth = {};

auth.login = function (req, res) {

    checkIfUserExists(req, res, function(err, user, message) {
        if (err || message) {
            console.log(err, message);
            authFailed(res);
        }
        if (user) {

            var GUID   = generateGUID();
            var token  = generateToken(user, GUID);
            var record = {
                "valid" : true,
                "created" : new Date().getTime()
            };

            var cookies = new Cookies(req, res)
            cookies.set( "token", token);

            //need to respond with cookie
            res.writeHead(303, {
                'Location': '/#/orders'
            });

            res.end();
        }
    });
}

auth.validate = function (req, res) {

    var cookie = req.headers.cookie.split("=");
    var token = cookie[1];
    var decoded = verify(token);

    if(!decoded || !decoded.auth) {
        res.writeHead(303, {
            'Location': '/#/login'
        });
        res.end();
    } else {
        console.log('Authenticated!');

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        var response = JSON.stringify({
            username: 'username'
        });

        res.end(response);
    }
}

auth.logout = function (req, res) {
    //validate, delete cookie
        // FIXME: req.headers.auth... not woring
        console.log(req.headers);
        var token = req.headers.authorization;
        var decoded = verify(token);

        if(decoded) {
            res.end(logoutScript);
            // TODO: delete from db
        } else {
            res.writeHead(303, {
                'Location': '/#/login'
            });
            res.end();
        }
}

module.exports = auth;

// passport.serializeUser(function(user, done) {
//     console.log("serializeUser")
//     done(null, user);
// });

// passport.deserializeUser(function(id, done) {

//      console.log("deserializeUser")
//     client.connect(function(err, user) {
//         if (err) {
//             return console.error('could not connect to postgres', err);
//         }
//         console.log(user);

//         client.query('SELECT * FROM users WHERE user_name = $1', [username],function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//             if (user) {
//                 return done(err, user);
//             }
//         });
//     });
// });

// var auth = {}

// auth.login = function(req, res) {
//     var formData = "";

//     req.on('data', function (data) {
//             formData += data;
//         });
//     req.on('end', function () {
//         var logins = qs.parse(formData);

//         req.body = logins;


//         passport.authenticate('local', function (error, user, message) {
//             if (!user) {
//                 console.log('no user: ' + user + ' ' + error + ' ' + message);
//                 res.writeHead(302, {
//                     'Location': '/#/login',
//                 });
//                 return;
//             } else {
//                 res.writeHead(302, {
//                     'Location': '/#/orders',
//                     'user': user.rows[0].user_name
//                 });
//                 res.end();
//                 return;
//             }
//         })(req, res);
//     });
// }

// auth.logout = function(req, res) {
    
// }

// auth.validate = function(req, res) {
//     req.isAuthenticated();
//     console.log(req.headers.cookie);
// }
