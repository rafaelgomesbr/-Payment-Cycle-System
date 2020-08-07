const gulp = require('gulp')


function depsCSS(cb){
    return cb()
}

function depsFonts(cb){
    return cb()
}

module.exports = {
    depsCSS,
    depsFonts
}


/*
gulp.task('deps',['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', () => {

})

gulp.task('deps.css', () => {

})

gulp.task('deps.fonts', () => {

})*/