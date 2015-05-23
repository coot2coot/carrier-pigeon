(function () {
	"use strict";

	var gulp       = require("gulp");
	var sass       = require("gulp-sass");
	var nodemon    = require("gulp-nodemon");
    var shell      = require('gulp-shell');
    var mocha      = require('gulp-mocha');
    var browserify = require("browserify");
    var reactify   = require('reactify');
    var watchify   = require("watchify");
    var uglify     = require('gulp-uglify');
    var source     = require('vinyl-source-stream');
    var sauceUser  = process.env.SAUCE_USERNAME || require("./credentials.json").username;
    var sauceKey   = process.env.SAUCE_ACCESS_KEY || require("./credentials.json").accesskey;
    var SCL        = require("sauce-connect-launcher");

    var sassSrc        = "./src/scss/main.scss";
    var conciseSrc     = "./src/scss/vendors/concise/concise.scss";
    var cssDestination = "./public/css/";
    var reactSrc       = "./src/app.jsx";
    var jsDestination  = "./public/js/";


/*******************************
*       PREREQUISITE TASKS
********************************/
    
    gulp.task('open', shell.task([
        'open http://localhost:8000'
    ]));

    gulp.task('selenium-install', shell.task([
      'node_modules/.bin/selenium-standalone install'
    ]));

    gulp.task('selenium-start', shell.task([
      'node_modules/.bin/selenium-standalone start'
    ]));

/*******************************
*       TEST TASKS
********************************/

    gulp.task('integration-tests', shell.task([
      'tape tests/integration/integrationtests.js'
    ]));

    gulp.task('unit-tests', shell.task([
      'node_modules/.bin/tape tests/unit/lib/*.js'
    ]));

    //Please run task `gulp selenium-start` before running
    gulp.task("e2e-local", function() {
        nodemon({
            script: "server.js",
            ext: "js html",
            ignore: ["node_modules"]
        })
        .on("start", function(){
            return gulp.src("./tests/acceptance/local.config.js")
            .pipe(mocha({
                reporter: 'nyan'
            }))
            .on("end", function() {
                console.log("Tests finished");
                process.exit();
            });
        });
    });

    //run server as well as this.
    gulp.task("e2e", function() {
        SCL({
            username: sauceUser,
            accessKey: sauceKey
        }, function (err, sauceConnectProcess) {
            if (err) {
              console.error(err.message);
              return;
            }
             nodemon({
                script: "server.js",
                ext: "js html",
                ignore: ["node_modules"]
            })
            .on("start", function(){
                gulp.src("./tests/acceptance/remote.config.js")
                    .pipe(mocha({
                        reporter: 'nyan'
                    }))
                    .on("end", function() {
                        console.log("Tests finished");
                        process.exit();
                    })
                    .on("error", function(e) {
                        sauceConnectProcess.close(function () {
                            console.log("Closed Sauce Connect process");
                        });
                    });
            })
            .on("end", function(e) {
                sauceConnectProcess.close(function () {
                    console.log("Closed Sauce Connect process");
                });
            });
        });
    });

    gulp.task('test', ["integration-tests", "unit-tests"], function () {
        console.log("Done testing");
    });

/*******************************
*       COMPILING TASKS
********************************/

	gulp.task("sass-dev", function () {
        return gulp.src(sassSrc)
            .pipe(sass())
            .pipe(gulp.dest(cssDestination));
    });

    //task for minifying css for production
    gulp.task("sass-production", ["concise"], function () {
        return gulp.src(sassSrc)
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest(cssDestination));
    });

    //task for minifying css for production
    gulp.task("concise", function () {
        return gulp.src(conciseSrc)
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest(cssDestination));
    });

    //Task for watching, and compiling sass for development
    gulp.task("sass-watch", function () {
        gulp.watch(sassSrc, ["sass-dev", "concise"]);
    });

    gulp.task("bundle", function () {

        var b = browserify();
          b.transform(reactify);
          b.add(reactSrc);
          return b.bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(jsDestination));
    });

    gulp.task("watchify", function () {

        var b = browserify({
            entries: [reactSrc], 
            transform: [reactify],
            debug: true,
            cache: {}, packageCache: {}, fullPaths: true 
        });

        var watcher  = watchify(b);

        return watcher
            .on('update', function () { 
                var updateStart = Date.now();
                watcher.bundle()
                    .pipe(source("bundle.js"))
                    .pipe(gulp.dest(jsDestination));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(jsDestination));
    });


/*******************************
*       BUILD TASKS
********************************/

	// For development
    gulp.task("watch", ["sass-watch", "watchify"])

    // For Production
	gulp.task("build", ["sass-production", "bundle"] , function() {
        return console.log("done building");
    });
    
    //TODO: Need to add tests task back in here once tests are updated
    gulp.task("deploy", ["build","test"], function() {
        console.log("Done building");
    });

	gulp.task("default", ["build", "open"], function() {
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
