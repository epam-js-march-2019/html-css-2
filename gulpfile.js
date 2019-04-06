"use strict"

var gulp = require("gulp");
var rename = require("gulp-rename");
var scss = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var csso = require("gulp-csso");

gulp.task("css_flex", function () {
  return gulp.src("Cubes_flex/sass/style.scss")
    .pipe(plumber())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("Cubes_flex/css"))
    .pipe(server.stream());
});

gulp.task("css_grid", function () {
  return gulp.src("Cubes_grid/sass/style.scss")
    .pipe(plumber())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("Cubes_grid/css"))
    .pipe(server.stream());
});

gulp.task("css_float", function () {
  return gulp.src("Cubes_float/sass/style.scss")
    .pipe(plumber())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("Cubes_float/css"))
    .pipe(server.stream());
});

gulp.task("server_flex", function () {
  server.init({
    server: "Cubes_flex/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("Cubes_flex/sass/*.scss", gulp.series("css_flex"));
  gulp.watch("Cubes_flex/*.html").on("change", server.reload);
});

gulp.task("server_grid", function () {
  server.init({
    server: "Cubes_grid/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("Cubes_grid/sass/*.scss", gulp.series("css_grid"));
  gulp.watch("Cubes_grid/*.html").on("change", server.reload);
});

gulp.task("server_float", function () {
  server.init({
    server: "Cubes_float/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("Cubes_float/sass/*.scss", gulp.series("css_float"));
  gulp.watch("Cubes_float/*.html").on("change", server.reload);
});


gulp.task("start", gulp.series("css_flex", "css_grid", "css_float", "server_flex", "server_grid", "server_float"));
