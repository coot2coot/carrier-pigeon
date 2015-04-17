var sqlFixtures = require("sql-fixtures");

var dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'testdb',
    port: 5432
  }
};

var dataSpec = {
  users: {
    username: 'Bob',
    email: 'bob@example.com'
  }
};

sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
	if(err){
		console.error(err)
	}
	if(result){
		console.log(result.users[0].username);
	}
});