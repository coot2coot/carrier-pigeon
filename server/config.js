(function () {
	"use strict";

	var serverConfig = {};

	serverConfig = {
		host: "localhost",
		port: proccess.env.PORT || "8000"
	};

	module.exports = serverConfig;
})();
