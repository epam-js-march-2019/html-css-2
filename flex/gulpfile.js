var gulp = require('gulp'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean-css');

var mainLessFile = './assets/css/sources/main.less';
var cssDir = './assets/css/';
var watchDir = './assets/css/sources/';

gulp.task('compile-css', function () {
    return gulp.src(mainLessFile)
        .pipe(less())
        .pipe(prefixer({
            browsers: ['last 7 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest(cssDir));
});

gulp.task('watch', function () {
    gulp.watch(watchDir + '**/*.less', gulp.series('compile-css'));
});

gulp.task('default', gulp.series('compile-css', 'watch'));