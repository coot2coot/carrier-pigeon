var pg       = require("pg");
var dataBase = process.env.POSTGRES_URI || require('../../credentials.json').postgres;
var client   = new pg.Client("postgres://"+ dataBase + "/carrier-pigeon-dev");



// module.exports = function (username, password, remember, done) {
//     console.log(client.connection._events);
//     // client.connect();
//     client.on('drain', client.end.bind(client));

//     var query = client.query({
//         text: 'SELECT * FROM users WHERE user_name = $1',
//         values: [username]
//     });

//     query.on('error', function(err) {
//         console.log(err);
//     });

//     query.on('row', function(row) {
//         console.log(row);
//         if (row.password === password) {
//             done(null, row, remember);
//         } 
//         else {
//             done(null, false, null,'Incorrect username or password combo');
//         }
//     });

//     query.on('end', function() { 
//         console.log('connection closing');
//         client.end();
//     });
// }

module.exports = function (username, password, remember, done) {

    console.log(dataBase, username, password, remember);
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