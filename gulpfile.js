(function () {
	"use strict";

	// TODO: need tasks for testing for unit, integration, and acceptance (also need a gulp test, for all tests)

	var gulp = require("gulp"),
		sass = require("gulp-sass"),
		nodemon = require("gulp-nodemon");


	var serverFiles = ["./server.js", "./server/*.js", "./server/*/*.js"],
		sassFiles = ["./public/css/*.scss", "./public/css/*/*.scss"];

/*******************************
*       TEST TASKS
********************************/


/*******************************
*       COMPILING TASKS
********************************/

	gulp.task("sass-dev", function () {
        return gulp.src("./public/css/main.scss")
            .pipe(sass())
            .pipe(gulp.dest("./public/css/"));
    });

    //task for minifying css for production
    gulp.task("sass-production", function () {
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
        gulp.watch(sassFiles, ["sass-dev"]);
    });


/*******************************
*       BUILD TASKS
********************************/
	
	gulp.task("build", ["sass-dev"] , function() {
        return console.log("done building");
    });

	gulp.task("default",["build"],  function() {
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