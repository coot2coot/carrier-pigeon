(function () {
	"use strict";

	var gulp = require("gulp"),
		sass = require("gulp-sass"),
		nodemon = require("gulp-nodemon"),
        shell = require('gulp-shell'),
        mocha = require('gulp-mocha');


	var serverFiles = ["./server.js", "./server/*.js", "./server/*/*.js"],
		sassFiles = ["./public/css/*.scss", "./public/css/*/*.scss"],
        e2eFiles = ["./tests/acceptance/test.js"];


/*******************************
*       PREREQUISITE TASKS
********************************/

    gulp.task('selenium-install', shell.task([
      'node_modules/.bin/selenium-standalone install'
    ]));

    gulp.task('selenium-start', shell.task([
      'node_modules/.bin/selenium-standalone start'
    ]));

    gulp.task('open', shell.task([
      'open http://localhost:8000'
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
    gulp.task("e2e", function() {
        nodemon({
            script: "server.js",
            ext: "js html",
            ignore: ["node_modules"]
        })
        .on("start", function(){
            return gulp.src(e2eFiles)
            .pipe(mocha({
                reporter: 'nyan'
            }))
            .on("end", function() {
                console.log("Tests finished");
                process.exit();
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


/*******************************
*       BUILD TASKS
********************************/
	
	gulp.task("build", ["sass-production"] , function() {
        return console.log("done building");
    });

    gulp.task("deploy", ["build", "test"] , function() {
        nodemon({
            script: "server.js",
            ext: "js html",
            ignore: ["node_modules"]
        })
        .on("start", function(){
            return gulp.src(e2eFiles)
            .pipe(mocha({
                reporter: 'nyan'
            }))
            .once('error', function () {
                process.exit(1);
            })
            .once('end', function () {
                process.exit();
            });
        });
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
