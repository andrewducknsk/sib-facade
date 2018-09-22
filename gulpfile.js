'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    prefixer = require('autoprefixer'),
    server = require('browser-sync').create(),
    minifycss = require('gulp-csso'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    svgsprite = require('gulp-svgstore'),
    posthtml = require('gulp-posthtml'),
    include = require('posthtml-include'),
    del = require('del'),
    run = require('run-sequence');

gulp.task('style', function () {
  gulp.src('sass/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    prefixer()
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe(minifycss())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream());
});

gulp.task('image', function () {
  return gulp.src('img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('img'));
});

gulp.task('webp', function () {
  return gulp.src('img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('img'));
});

gulp.task('sprite', function () {
  return gulp.src('img/logo-*.svg')
    .pipe(svgsprite({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('img'));
});

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('build', function (done) {
  run(
    'clean',
    'copy',
    'style',
    'js',
    'sprite',
    'html',
    done
  );
});

gulp.task('copy', function () {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/**',
    'js/**',
    'css/**',
    'favicon.ico'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
  return gulp.src('js/*.js')
    .pipe(gulp.dest('build/js'))
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('serve', function () {
  server.init({
    server: 'build/'
  });
  gulp.watch('./sass/**/*.scss', ['style']).on('change', server.reload);
  gulp.watch('./*.html', ['html']).on('change', server.reload);
  gulp.watch('./js/**/*.js', ['js']).on('change', server.reload);
});
