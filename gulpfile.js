var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var utilities = require("gulp-util");
var buildProduction = utilities.env.production;
var del = require("del");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat")
var lib = require("bower-files")({
  "overrides":{
    "bootstrap":{
      "main":[
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/boostrap.js",
        "dist/css/styling.css"
      ]
    }
  }
});
var browserSync = require("browser-sync").create();

gulp.task("serve", function(){
  browserSync.init({
    server:{
      baseDir:"./",
      index:"index.httml"
    }
  });
});

gulp.task("bowerCSS", function(){
  return gulp.src(lib.ext("css").files)
  .pipe(concat("vendor.css"))
  .pipe(gulp.dest("./build/css"));
});

gulp.task("bowerJS", function(){
  return gulp.src(lib.ext("js").files)
  .pipe(concat("vendor.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"))
});

gulp.task("bower", ["bowerJS", "bowerCSS"]);

gulp.task("concatenate", function(){
  return gulp.src(["./js/*-interface.js"])
  .pipe(concat("allFrontEnd.js"))
  .pipe(gulp.dest("./tmp"));
});

gulp.task("jshint", function(){
  return gulp.src(["js/*.js"])
  .pipe(jshint())
  .pipe(jshint.reporter("default"));
});

gulp.task("clean", function(){
  return del(["build"])
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/apps.js")
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"));
});

gulp.task("jsBrowserify", ["concatenate"], function(){
  return browserify({ entries: ["./tmp/allFrontEnd.js"]})
  .bundle()
  .pipe(source("app.js"))
  .pipe(gulp.dest("./build/js"));
})

gulp.task("build", ["clean"], function(){
  if (buildProduction){
    gulp.start("minifyScripts");
  }else {
    gulp.start("jsBrowserify");
  }
  gulp.start("bower");
});
