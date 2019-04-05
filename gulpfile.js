var svgSprite = require('gulp-svg-sprite');
var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
const buildFolder = 'public';

var bs = browserSync.create();

const cleanSprite = (done) => {
  try {
    del('./img/sprite.svg')
  } catch(err) {
    done();
  };
  done();
}

var watch = (done) => {
  gulp.watch(['*.html', '*.css', '*.js', '*.svg']);
  done();
};

const createSVGSprite = (done) => {
  gulp.src('img/**/*.svg')
      .pipe(plumber())
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              dest: '.',
              sprite: 'sprite.svg',
              layout: 'vertical',
            },
          },
        }),
      )
      .pipe(gulp.dest(`./img`));
  done();
}


var syncBrowser = (done) => {
  bs.init(null, {
    server: {
      baseDir: `.`,
    },
    open: false,
    notify: false,
  });
  bs.watch(`./**/*.*`, {
  }).on('change', bs.reload);
  done();
};

gulp.task('start', gulp.parallel(watch, syncBrowser));
gulp.task('sprite', gulp.series(cleanSprite, createSVGSprite));
