var AWS 			= require('aws-sdk');
var awsAccessKey 	= require('../../credentials.json').awsAccessKey;
var awsSecret 		= require('../../credentials.json').awsSecret;
var validateUser 	= require('../lib/validate-user.js');
var db				= require('../db-config.js');
var parseData    	= require('../lib/get-form-data.js');
var removes 		= require('../lib/removeQuotes.js');

var deleteFile		= {};

var config = {
	accessKeyId: awsAccessKey,
	secretAccessKey: awsSecret
};

deleteFile.fromTwoDb = function (req, res) {

	AWS.config.update(config);
	var s3 = new AWS.S3();

	parseData(req, function (data) {

		data = removes(data)
		validateUser(req, res, function () {

			db.clearFileName('orders', data, function (err) {
				if(err){
					res.writeHead(500);
					res.write(err);
					res.end();
				}
				var params = {
					Bucket: 'carrier-pigeon-s3',
					Key: data.file_name
				}

				s3.deleteObject(params, function (err) {

					if(err){
						res.writeHead(500);
						res.write(err);
						res.end();
					} else {
						res.writeHead(200);
						res.end();
					}

				})
			})
		})
	})
}

deleteFile.fromOneDb = function (req, res) {

	AWS.config.update(config);
	var s3 = new AWS.S3();

	parseData(req, function (data) {

		data = removes(data)
		validateUser(req, res, function () {

			var params = {
				Bucket: 'carrier-pigeon-s3',
				Key: data.file_name
			}

			s3.deleteObject(params, function (err) {

				if(err){
					res.writeHead(500);
					res.write(err);
					res.end();
				} else {
					res.writeHead(200);
					res.end();
				}
			})
		})
	})
}

module.exports = deleteFile;
