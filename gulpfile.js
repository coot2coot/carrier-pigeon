(function () {
	"use strict";

	var gulp = require("gulp"),
		sass = require("gulp-sass"),
		nodemon = require("gulp-nodemon"),
        shell = require('gulp-shell'),
        nightwatch = require('gulp-nightwatch'),
        runSequence = require('run-sequence'),
        // sauceUsername = /*SAUCE_USERNAME ||*/ require("./credentials.json").username,
        // sauceAccessKey = /*SAUCE_ACCESS_KEY ||*/ require("./credentials.json").accessKey,
        sauceConnectLauncher = require("sauce-connect-launcher");


	var serverFiles = ["./server.js", "./server/*.js", "./server/*/*.js"],
		sassFiles = ["./public/css/*.scss", "./public/css/*/*.scss"],
        e2eFiles = ["./tests/acceptance/landing.js"];


/*******************************
*       PREREQUISITE TASKS
********************************/

    gulp.task('open', shell.task([
      'open http://localhost:8000'
    ]));

    gulp.task('selenium-install', shell.task([
        'node_modules/.bin/selenium-standalone install'
    ]));

    gulp.task('selenium-start',shell.task([
        'node_modules/.bin/selenium-standalone start'
    ]));

     //Need a selenium server to run with this.
    gulp.task('nightwatch', function(){
        gulp.src(e2eFiles)
            .pipe(nightwatch({
                configFile: 'tests/acceptance/nightwatch.config.json'
            }))
            .on('end', function() {
                process.kill();
            });
    });

    gulp.task("e2e-chrome", function() {
        sauceConnectLauncher({
            username: sauceUsername,
            accessKey: sauceAccessKey
        }, function (err, sauceConnectProcess) {
            if (err) {
              console.error(err.message);
              return;
            }
            gulp.src(e2eFiles)
                .pipe(nightwatch({
                    configFile: 'tests/acceptance/saucelabs.config.json',
                    cliArgs: {
                        env: 'chrome'
                    }
                }))
                .on("end", function() {
                    sauceConnectProcess.close(function () {
                        console.log("Closed Sauce Connect process");
                    });
                });
            });
    });

    gulp.task("e2e-safari", function() {
        sauceConnectLauncher({
            username: sauceUsername,
            accessKey: sauceAccessKey
        }, function (err, sauceConnectProcess) {
            if (err) {
              console.error(err.message);
              return;
            }
            gulp.src(e2eFiles)
                .pipe(nightwatch({
                    configFile: 'tests/acceptance/saucelabs.config.json',
                    cliArgs: {
                        env: 'safari'
                    }
                }))
                .on("end", function() {
                    sauceConnectProcess.close(function () {
                        console.log("Closed Sauce Connect process");
                    });
                });
            });
    });

    gulp.task("e2e-firefox", function() {
        sauceConnectLauncher({
            username: sauceUsername,
            accessKey: sauceAccessKey
        }, function (err, sauceConnectProcess) {
            if (err) {
              console.error(err.message);
              return;
            }
            gulp.src(e2eFiles)
                .pipe(nightwatch({
                    configFile: 'tests/acceptance/saucelabs.config.json',
                    cliArgs: {
                        env: 'firefox'
                    }
                }))
                .on("end", function() {
                    sauceConnectProcess.close(function () {
                        console.log("Closed Sauce Connect process");
                    });
                });
            });
    });

/*******************************
*       TEST TASKS
********************************/

    gulp.task('integration-tests', shell.task([
      'node tests/integration/*.js'
    ]));

    gulp.task('unit-tests', shell.task([
      'tape tests/unit/*.js'
    ]));

    //Please run task `gulp selenium-install` before running
    gulp.task("e2e-local", ["selenium-install"], function () {
        nodemon({
            script: "server.js",
            ext: "js html",
            ignore: ["node_modules"]
        })
        .on("start", function(){
            return gulp.src("")
            .pipe(shell(["node_modules/.bin/selenium-standalone start && gulp nightwatch"]));
        });
    });

    //Runs on SauceLabs
    gulp.task("e2e", function() {
        runSequence("e2e-safari", 
                    "e2e-chrome", 
                    "e2e-firefox", 
                    function () {
                        console.log("Testing is finished");
                    });
    });

    gulp.task('test', ["integration-tests", "unit-tests"], function () {
        console.log("Done testing");
    });

/*******************************
*       COMPILING TASKS
********************************/

	gulp.task("sass-dev", function () {
        return gulp.src("./public/css/main.scss")
            .pipe(sass())
            .pipe(gulp.dest("./public/css/"));
    });

    //task for minifying css for production
    gulp.task("sass-production", ["concise"], function () {
        return gulp.src("./public/css/main.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest("./public/css/"));
    });

    //task for minifying css for production
    gulp.task("concise", function () {
        return gulp.src("./public/css/vendors/concise/concise.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest("./public/css/vendors"));
    });

    //Task for watching, and compiling sass for development
    gulp.task("sass-watch", function () {
        gulp.watch(sassFiles, ["sass-dev", "concise"]);
    });


/*******************************
*       BUILD TASKS
********************************/
	
	gulp.task("build", ["sass-production"] , function() {
        return console.log("done building");
    });

    gulp.task("deploy", ["build", "test"] , function() {
        gulp.src(e2eFiles)
            .pipe(nightwatch({
                configFile: 'tests/acceptance/nightwatch.config.json',
                cliArgs: {
                    env: 'safari'
                  }
            }))
            .pipe(nightwatch({
                configFile: 'tests/acceptance/nightwatch.config.json',
                cliArgs: {
                    env: 'chrome'
                  }
            }))
            .pipe(nightwatch({
                configFile: 'tests/acceptance/nightwatch.config.json',
                cliArgs: {
                    env: 'firfox'
                  }
            }));
    });

	gulp.task("default",["build","open"], function() {
        nodemon({
            script: "server.js",
            ext: "js html",
            ignore: ["node_modules"]
        })
        .on("restart", function(){
            console.log("restarted");
        });
    });
	
})();