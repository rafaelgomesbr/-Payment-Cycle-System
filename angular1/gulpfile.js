const gulp = require('gulp')
const series = gulp.series
const parallel = gulp.parallel
 
const { appHTML,  appCSS,  appJS, appAssets} = require('./gulpTasks/app')
const { depsCSS,depsFonts} = require('./gulpTasks/deps')
const { watch,  server} = require('./gulpTasks/server')
 
 
module.exports.default = series(
  parallel( 
    series(appHTML,  appCSS,  appJS, appAssets),
    series(depsCSS,depsFonts)
    ),
    server,
    watch
    ) 






/*const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

gulp.task('default', () => {
  if(util.env.production){
    sequence('deps', 'app')
  } else{
    sequence('deps', 'app', 'server')
  }
})
*/
 
 




/*const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

gulp.task('default', () => {
  if(util.env.production){
    sequence('deps', 'app')
  } else{
    sequence('deps', 'app', 'server')
  }
})
*/
 
 