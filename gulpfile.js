var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    open = require('gulp-open'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    es = require('event-stream');

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: 4002}));
    app.use(express.static(__dirname));
    app.listen(4000);
});

var tinylr;
gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(4002);
});

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
};

gulp.task('styles', function() {
    return gulp.src('src/app/scss/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('src/app/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('src/app/assets/css'));
});

gulp.task('url', function(){
    var options = {
        url: 'http://localhost:4000',
        app: 'google chrome'
    };
    gulp.src('dist/src/index.html')
        .pipe(open('', options));
});

gulp.task('watch', function() {
    gulp.watch('src/app/assets/scss/*.scss', ['styles']);
    gulp.watch('*.html', notifyLiveReload);
    gulp.watch('src/app/assets/css/*.css', notifyLiveReload);
});

gulp.task('index', function () {
    var appStream = gulp.src(['./src/app/*.js', './src/app/assets/**/*.min.css'], {read: false}, {relative: true});
    gulp.src('src/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}, {relative: true}))
        .pipe(inject(es.merge(
            appStream,
            gulp.src('src/app/**/*.js', {read: false})
        )))
        .pipe(gulp.dest('dist/src/'));
});

gulp.task('default', ['styles', 'express', 'livereload', 'watch','url', 'index'], function() {

});