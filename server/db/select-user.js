module.exports = function(pg, conString) {
    return function (username, password, remember, cb) {
        pg.connect(conString, function(err, client, done) {

            var handleError = function(err) {
                if(!err) return false;

                done(client);
                res.writeHead(500, {'content-type': 'text/plain'});
                res.end('An error occurred');
                return true;
            };

            client.query('SELECT * FROM users WHERE user_name = $1', [username], function(err, user) {
  
                if(handleError(err)) return;

                done();

                if (user.rows[0] && user.rows[0].password === password) {
                    cb(null, user.rows[0], remember);
                } 
                else {
                    cb(null, false, null,'Incorrect username or password combo');
                }
            });
        });
    };
};
