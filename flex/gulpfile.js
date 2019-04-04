const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


sass.compiler = require('node-sass');

gulp.task('css', () => {
    return gulp.src('./**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 11'],
            cascade: false
        }))
        .pipe(gulp.dest('./')).pipe(browserSync.stream());

});

gulp.task('serve', ['css'], function () {

    browserSync.init({
        server: "./"
    });
    gulp.watch('./**/*.scss', ['css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('default', ['serve']);