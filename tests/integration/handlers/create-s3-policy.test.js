var test 	= require('tape');
var shot 	= require('shot');
var policy 	= require('../../../server/handlers/create-s3-policy.js');

test('the create-s3-policy handler should return a string', function (t) {

	shot.inject(policy, {method: 'get', url: '/contacts'}, function (res) {

		t.equal(typeof res.payload, 'string', 'payload is a string');
		t.end();
	});
});

test('the create-s3-policy handler should return a policy and signature', function (t) {

	shot.inject(policy, {method: 'get', url: '/contacts'}, function (res) {
		var policy = JSON.parse(res.payload)
		t.equal(typeof policy.policy, 'string', 'policy is a string');
		t.equal(typeof policy.signature, 'string', 'signature is a string');
		t.end();
	});
});