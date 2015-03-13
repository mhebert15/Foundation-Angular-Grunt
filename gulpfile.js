var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    open = require('gulp-open'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    pngquant = require('imagemin-pngquant'),
    runsequence = require('run-sequence'),
    watch = require('gulp-watch'),
    gmerge = require('gulp-merge'),
    html2js = require('gulp-html2js'),
    minifyHTML = require('gulp-minify-html'),
    annotate = require('gulp-ng-annotate'),
    root = './build/src';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src('build/')
        .pipe(clean({force: true}));
});

//Task for sass using libsass through gulp-sass
gulp.task('styles', function () {
    return gulp.src('src/app/assets/sass/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('src/app/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build/src/app/assets/css'))
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', function () {
    return gmerge(gulp.src('src/app/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default')),
        gulp.src('src/app/**/*.html')
            .pipe(minifyHTML({
                empty: true,
                conditionals: true
            }))
            .pipe(html2js({
                base: 'src/app',
                outputModuleName: 'foundationApp.templates',
                useStrict: true
            }))
            .pipe(concat('foundationApp.templates.js')))
        .pipe(annotate())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(root + "/app/assets/js"))
});

// Process vendor scripts and concatenate them into one output file
gulp.task('vendor', function () {
    return gulp.src(bowerFiles())
        .pipe(uglify({mangle: false}))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(root + '/app/assets/js/'))
});

//Task for minifying images with imagemin
gulp.task('imagemin', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(root + '/app/assets/images/'))
});

//Task for moving html-files to the build-dir
//added as a convenience to make sure this gulpfile works without much modification

gulp.task('build', ['styles', 'scripts', 'imagemin', 'vendor'], function () {

});

gulp.task('index', function () {
    var css = gulp.src(['build/src/app/assets/**/*.min.css'], {read: false});
    return gulp.src('src/index.html')
        .pipe(inject(gulp.src('build/src/app/assets/js/vendor.min.js', {read: false}),
            {
                name: 'vendor',
                ignorePath: '/build/src/',
                addRootSlash: false
            }
        ))
        .pipe(inject(es.merge(
                css,
                gulp.src('build/src/app/assets/js/app.min.js', {read: false})),
            {
                ignorePath: '/build/src/',
                addRootSlash: false
            }
        )
    )
        .pipe(gulp.dest(root))
});

gulp.task('connect', function () {
    connect.server({
        root: root,
        port: 5000,
        livereload: true
    });
});

gulp.task('url', function(){
    var options = {
        url: 'http://localhost:5000',
        app: 'chrome'
    };
    gulp.src('./build/src/index.html')
        .pipe(open('', options));
});

gulp.task('watch', function () {
    gulp.watch('src/app/assets/css/*.css', ['styles']);
    gulp.watch('src/app/**/*.js', ['scripts']);
    gulp.watch('src/app/assets/images/*', ['imagemin']);
    gulp.watch('src/app/**/*.html', ['scripts']);
    gulp.watch('src/index.html', ['index']);
    watch(root).pipe(connect.reload());
});

gulp.task('default', function () {
    runsequence('clean', 'build', 'index', 'connect','url', 'watch');
});