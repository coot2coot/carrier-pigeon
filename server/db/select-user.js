var pg       = require("pg");
var dataBase = process.env.POSTGRES_URI || require('../../credentials.json').postgres;
var client   = new pg.Client("postgres://"+ dataBase + "/carrier-pigeon-dev");

module.exports = function (username, password, remember, done) {
    client.end();
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT * FROM users WHERE user_name = $1', [username],function(err, user) {

            client.end();
            
            if (err) {
                return done(err);
            }
            if (user.rows[0].password === password) {
                done(null, user.rows[0], remember);
            } 
            else {
                done(null, false, null,'Incorrect username or password combo');
            }
        });
    });
}