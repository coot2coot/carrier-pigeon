var pg       = require("pg");
var dataBase = process.env.POSTGRES || require('../../credentials.json').postgres;
var client   = new pg.Client("postgres://"+ dataBase + "/carrier-pigeon-dev");

module.exports = function (username, password, remember, done) {
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT * FROM users WHERE user_name = $1', [username],function(err, user) {

            if (err) {
                client.end();
                return done(err);
            }
            if (user.rows[0].password === password) {
                client.end();
                done(null, user.rows[0], remember);
            } 
            else {
                client.end();
                done(null, false, null,'Incorrect username or password combo');
            }
        });
    });
}