var policy 			= require('s3-policy');
var awsSecret 		= process.env.AWS_SECRET_KEY || require('../../credentials.json').awsSecret;
var awsAccessKey 	= process.env.AWS_ACCESS_KEY_ID || require('../../credentials.json').awsAccessKey;

function getPolicy (req, res) {

	var p = policy({
		secret: awsSecret,
		length: 5000000,
		bucket: 'carrier-pigeon-s3',
		key: awsAccessKey,
		expires: new Date(Date.now() + 1800000),
		acl: 'public-read'
	})

	var pString = JSON.stringify(p);

	res.writeHead(200, {"Content-Type" : "text/plain"});
	res.end(pString);
}

module.exports = getPolicy;
