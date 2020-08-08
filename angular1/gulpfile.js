const gulp = require("gulp");
const series = gulp.series;
const parallel = gulp.parallel;

const { appHTML, appCSS, appJS, appAssets } = require("./gulpTasks/app");
const { depsCSS, depsFonts, depsJS } = require("./gulpTasks/deps");
const { watchFiles, server } = require("./gulpTasks/server");

module.exports.default = series(
  parallel(
    series(appHTML, appCSS, appJS, appAssets),
    series(depsCSS, depsJS, depsFonts)
  ),
  server,
  watchFiles
);
