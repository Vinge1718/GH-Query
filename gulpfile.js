var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var utilities = require("gulp-util");
var buildProduction = utilities.env.production;
var dell = require("del");
/*
var concat = require("gulp-concat")

gulp.task("concatenate", function(){
  return gulp.src(["./js/*-interface.js"])
  .pipe(concat("allFrontEnd.js"))
  .pipe(gulp.dest("./tmp"));
});
*/

gulp.task("clean", function(){
  return del(["build"])
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/apps.js")
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"));
});

gulp.task("jsBrowserify",function(){
  return browserify({ entries: ["./js/gh-query-interface.js"]})
  .bundle()
  .pipe(source("app.js"))
  .pipe(gulp.dest("./build/js"));
})

gulp.task("build", function(){
  if (buildProduction){
    gulp.start("minifyScripts");
  }else {
    gulp.start("jsBrowserify");
  }
});
