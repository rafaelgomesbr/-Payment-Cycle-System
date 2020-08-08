const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const uglifycss = require("gulp-uglifycss");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin");

function appHTML() {
  return gulp
    .src("app/**/*.html")
    .pipe(htmlmin({ "collapseWhitespace": true }))
    .pipe(gulp.dest("public"));
}

function appCSS() {
  return gulp
    .src("app/**/*.css")
    .pipe(uglifycss({ "unglyComments": true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest("public/assets/css"));
}

function appJS( ) {
  return gulp.src('app/**/*.js')
  .pipe(babel({presets: ['env']}))
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('public/assets/js'))
}

function appAssets( ) {
  return gulp.src('assets/**/*.*')
  .pipe(gulp.dest('public/assets'))
}

module.exports = {
  appHTML,
  appCSS,
  appJS,
  appAssets,
};
