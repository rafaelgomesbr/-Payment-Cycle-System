const gulp = require("gulp");
const webserver = require("gulp-webserver");
const watch = require("gulp-watch");


function server() {
  return gulp.src("public")
  .pipe(webserver({
      port: 3000,
      open: true,
      livereload: true,
    })
  )
}


function watchFiles() {
    watch("app/**/*.html", () => gulp.series("appHTML")());
    watch("app/**/*.css", () => gulp.series("appCSS")());
    watch("app/**/*.js", () => gulp.series("appJS")());
    watch("app/**/*.assets", () => gulp.series("appAssets")());
 }
  

module.exports = {
  watchFiles,
  server,
};
