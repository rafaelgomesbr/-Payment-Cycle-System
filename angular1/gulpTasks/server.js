const gulp = require("gulp");
 
function watch(cb) {
  return cb();
}

function server(cb) {
  return cb();
}

module.exports = {
  watch,
  server,
};
/*
gulp.task('watch', ()=> {

})

gulp.task('server',[watch], () => {
    
})*/
