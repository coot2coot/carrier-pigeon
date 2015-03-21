(function () {
	"use strict";

	var serverConfig = {};

	serverConfig = {
		host: "localhost",
		port: process.env.PORT || "8000"
	};

	module.exports = serverConfig;
})();
