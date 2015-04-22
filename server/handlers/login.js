"use strict";

var loginUser = require('../lib/issue-token.js');

function loginHandler (req, res) {

 	if (req.method === "POST") {
		loginUser(req, res);
	} else {
		require('../lib/auth-failed.js')(req, res);
	}
}

module.exports = loginHandler;