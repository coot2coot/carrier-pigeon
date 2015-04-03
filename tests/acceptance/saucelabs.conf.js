var sauceUsername = process.env.SAUCE_USERNAME || require("../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../credentials.json").accesskey,
    nightwatchConfig;

nightwatchConfig = {
    "src_folders" : ["./tests/acceptance"],
    "output_folder" : "./tests/acceptance/reports",
    "custom_commands_path" : "",
    "custom_assertions_path" : "",
    "globals_path" : "",
  
    "selenium" : {
        "start_process" : false,
        "server_path" : "",
        "log_path" : "",
        "host" : "127.0.0.1",
        "port" : 4444,
        "cli_args" : {
            "webdriver.chrome.driver" : "",
            "webdriver.ie.driver" : ""
        }  
    },

    "test_settings" : {
        "default" : {
            "selenium_host" : "ondemand.saucelabs.com",
            "selenium_port" : 80,
            "username" : sauceUsername,
            "access_key" : sauceAccessKey,
            "use_ssl" : false,
            "silent" : true,
            "output" : true,
            "screenshots" : {
                "enabled" : false,
                "path" : ""
            },
            "desiredCapabilities": {
                "browserName": "chrome"
            },
            "selenium" : {
                "start_process" : false
            }
        },
        
        "chrome" : {
            "selenium_host" : "ondemand.saucelabs.com",
            "selenium_port" : 80,
            "username" : sauceUsername,
            "access_key" : sauceAccessKey,
            "use_ssl" : false,
            "silent" : true,
            "output" : true,
            "screenshots" : {
                "enabled" : false,
                "path" : ""
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "version": "41.0",
                "platform": "OS X 10.9",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            },
            "selenium" : {
                "start_process" : false
            }
        },

        "firefox" : {
            "selenium_host" : "ondemand.saucelabs.com",
            "selenium_port" : 80,
            "username" : sauceUsername,
            "access_key" : sauceAccessKey,
            "use_ssl" : false,
            "silent" : true,
            "output" : true,
            "screenshots" : {
                "enabled" : false,
                "path" : ""
            },
            "desiredCapabilities": {
                "browserName": "firefox",
                "version": "35.0",
                "platform": "OS X 10.9",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            },
            "selenium" : {
                "start_process" : false
            }
        },

        "safari" : {
            "selenium_host" : "ondemand.saucelabs.com",
            "selenium_port" : 80,
            "username" : sauceUsername,
            "access_key" : sauceAccessKey,
            "use_ssl" : false,
            "silent" : true,
            "output" : true,
            "screenshots" : {
                "enabled" : false,
                "path" : ""
            },
            "desiredCapabilities": {
                "browserName": "safari",
                "version": "8.0",
                "platform": "OS X 10.10",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            },
            "selenium" : {
                "start_process" : false
            }
        }
    }
}

module.exports = nightwatchConfig;
