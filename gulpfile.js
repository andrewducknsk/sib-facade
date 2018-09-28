let gulp = require('gulp'),
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
    run = require('run-sequence'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require('gulp-concat'),
    sourcemap = require('gulp-sourcemaps');


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

gulp.task('normalize', function () {
    gulp.src('css/**/normalize.css')
        .pipe(minifycss())
        .pipe(rename('normalize.min.css'))
        .pipe(gulp.dest('build/css'))
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
        .pipe(webp({quality: 65}))
        .pipe(gulp.dest('img'));
});

gulp.task('sprite', function () {
    return gulp.src('img/icon-*.svg')
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

gulp.task('copy', function () {
    return gulp.src([
        'css/**',
        'fonts/**/*.{woff,woff2}',
        'img/**',
        'favicon.ico'
    ], {
        base: '.'
    })
        .pipe(gulp.dest('build'));
});

gulp.task('concatJs', function () {
    return gulp.src('js/**/*.js')
    // .pipe(sourcemap.init())
        .pipe(concat('script.js', {newline: ';'}))
        // .pipe(sourcemap.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('compressJs', function (cb) {
    pump([
            gulp.src('build/js/**/*.js'),
            uglify(),
            gulp.dest('build/js')
        ],
        cb
    );
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('build', function (done) {
    run(
        'clean',
        'copy',
        'style',
        'normalize',
        'concatJs',
        'compressJs',
        'html',
        done
    );
});

gulp.task('serve', function () {
    server.init({
        server: 'build/'
    });
    gulp.watch('./sass/**/*.scss', ['style']).on('change', server.reload);
    gulp.watch('./*.html', ['html']).on('change', server.reload);
    gulp.watch('./js/**/*js', ['concatJs']).on('change', server.reload);
});