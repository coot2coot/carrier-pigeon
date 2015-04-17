var sqlFixtures = require("sql-fixtures");

var dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'test.db',
    port: 15432
  }
};

var dataSpec = {
  users: {
    username: 'Bob',
    email: 'bob@example.com'
  }
};

sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
  console.log(result.users[0].username);
});