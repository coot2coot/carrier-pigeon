var Shot 		= require('shot');
var deleteFile 	= require('../../../server/handlers/delete-file.js');
var login		= require('../../../server/handlers/login.js');
var test 		= require('tape');
var Http		= require('http');
var username	= require('../../../credentials.json').testUsername;
var password	= require('../../../credentials.json').testPassword;

test('delete file method returns something when file does not exist', function (t) {

	t.plan(2)
	var cookie;

	var log = function (req, res) {
		req.connection = 'https'
		login( req, res)
	}

	var server1 = Http.createServer(log);

	var loginDetails = 'username='+ username +'&password=' + password

	Shot.inject(log, { method: 'post', url: '/' , payload: loginDetails}, function (res) {

		cookie = res.headers['set-cookie'][0].split(';')[0] + ';' + res.headers['set-cookie'][1].split(';')[0]
	 	t.equal(res.headers['set-cookie'][0].indexOf('token'), 0, 'cookie was succesfully created');
    })

    t.test('file remove', function (st) {

    	var del = function (req, res) {
    		

			req.headers.cookie = cookie

			deleteFile.fromOneDb( req, res)
		}

    	var server2 = Http.createServer(del);

    	Shot.inject(del, { method: 'post', url: '/' , payload: 'file_name=123.png'}, function (res) {

	 		st.equal(res.statusCode, 200);
	        st.end();
    	})
    });
})
