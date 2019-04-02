var gulp = require('gulp'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean-css');

gulp.task('compile-css', function () {
    return gulp.src('./assets/css/sources/main.less')
        .pipe(less())
        .pipe(prefixer({
            browsers: ['last 7 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/css/sources/**/*.less', gulp.series('compile-css'));
});

gulp.task('default', gulp.series('compile-css', 'watch'));