var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
/*
var concat = require("gulp-concat")

gulp.task("concatenate", function(){
  return gulp.src(["./js/*-interface.js"])
  .pipe(concat("allFrontEnd.js"))
  .pipe(gulp.dest("./tmp"));
});
*/

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
