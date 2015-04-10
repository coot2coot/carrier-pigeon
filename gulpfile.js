(function () {
	"use strict";

	var gulp = require("gulp"),
		sass = require("gulp-sass"),
		nodemon = require("gulp-nodemon"),
        shell = require('gulp-shell'),
        mocha = require('gulp-mocha'),
        browserify = require("browserify"),
        reactify = require('reactify'),
        watchify = require("watchify"),
        uglify = require('gulp-uglify'),
        source = require('vinyl-source-stream'),
        sauceUsername = process.env.SAUCE_USERNAME || require("./credentials.json").username,
        sauceAccesskey = process.env.SAUCE_ACCESS_KEY || require("./credentials.json").accesskey,
        sauceConnectLauncher = require("sauce-connect-launcher");

	var serverFiles = ["./server.js", "./server/*.js", "./server/*/*.js"],
		sassFiles = ["./public/css/*.scss", "./public/css/*/*.scss"];


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
      'node tests/integration/*.js'
    ]));

    gulp.task('unit-tests', shell.task([
      'tape tests/unit/*.js'
    ]));

    //Please run task `gulp selenium-start` before running
    gulp.task("e2e-local", function() {
        nodemon({
            script: "server.js",
            ext: "js html",
            ignore: ["node_modules"]
        })
        .on("start", function(){
            return gulp.src("./tests/acceptance/test-local.js")
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
        sauceConnectLauncher({
            username: sauceUsername,
            accessKey: sauceAccesskey
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
                gulp.src("./tests/acceptance/test.js")
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

    gulp.task("bundle", function () {

        var b = browserify();
          b.transform(reactify);
          b.add('./public/app.jsx');
          return b.bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./public/js/'));
    });

    gulp.task("watchify", function () {

        var b = browserify({
            entries: ['./public/app.jsx'], 
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
                    .pipe(gulp.dest('./public/js/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest('./public/js/'));
    });


/*******************************
*       BUILD TASKS
********************************/
	
    gulp.task("watch", ["sass-watch", "watchify"])

	gulp.task("build", ["sass-production", "bundle"] , function() {
        return console.log("done building");
    });
    //TODO: Need to add tests task back in here once tests are updated
    gulp.task("deploy", ["build"], function() {
        sauceConnectLauncher({
            username: sauceUsername,
            accessKey: sauceAccesskey
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
                gulp.src("./tests/acceptance/test.js")
                    .pipe(mocha({
                        reporter: 'nyan'
                    }))
                    .on("end", function() {
                        sauceConnectProcess.close(function () {
                            console.log("Closed Sauce Connect process");
                            console.log("Tests finished");
                            process.exit();
                        });
                    })
                    .on("error", function(e) {
                        console.log(e);
                        sauceConnectProcess.close(function () {
                            console.log("Closed Sauce Connect process");
                        });
                    });
            })
        });
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
