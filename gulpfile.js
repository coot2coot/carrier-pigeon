(function () {
	"use strict";

	// TODO: need tasks for testing for unit, integration, and acceptance (also need a gulp test, for all tests)

	var gulp = require("gulp"),
		sass = require("gulp-sass"),
		nodemon = require("gulp-nodemon"),
        test = require('tape'),
        path = require('path'),
        shell = require('gulp-shell');


	var serverFiles = ["./server.js", "./server/*.js", "./server/*/*.js"],
		sassFiles = ["./public/css/*.scss", "./public/css/*/*.scss"];

/*******************************
*       TEST TASKS
********************************/

    gulp.task('test', shell.task([
      'node tests/*.js'
    ]));

    gulp.task('open', shell.task([
      'open http://localhost:8000'
    ]));

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
	
	gulp.task("build", ["sass-dev"] , function() {
        return console.log("done building");
    });

	gulp.task("default",["build","test","open"], function() {
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