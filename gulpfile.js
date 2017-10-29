var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglifycss = require('gulp-uglifycss'),
    less = require('gulp-less'),
    minifyJs = require('gulp-uglify');

const jsFilesApp = [
    'src/**/*.module.js',
    'src/**/*.component.js',
    'src/**/*.controller.js',
    'src/**/*.service.js',
    'src/**/*.element.js',
    'src/**/*.routes.js',
    'src/js/routes.js',
    'src/js/app.js'
];

gulp.task('vendors-css', function () {
    gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/angular-toastr/dist/angular-toastr.css'
    ])
        .pipe(concat('vendors-css.min.css'))
        .pipe(less({compress: true}))
        .pipe(uglifycss())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('app-css', function () {
    gulp.src([
        'src/css/todoList.css'
    ])
        .pipe(concat('app-css.min.css'))
        .pipe(less({compress: true}))
        .pipe(uglifycss())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('app-js', function () {
    gulp.src(jsFilesApp)
        .pipe(concat('app-js.min.js'))
        .pipe(ngAnnotate())
        .pipe(minifyJs())
        .pipe(gulp.dest('public/js/'))
});

gulp.task('vendors-js', function () {
    gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/jquery',
        'bower_components/angular-toastr/dist/angular-toastr.js',
        'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-route-segment/build/angular-route-segment.js',
        'bower_components/moment/moment.js',
        'bower_components/angular-moment/angular-moment.js',
        'bower_components/angular-bootstrap/ui-bootstrap.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ])
        .pipe(concat('vendors-js.min.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('clean', function () {
    return gulp.src(['public/css/*', 'public/js/*'])
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    var tasks = ['vendors-css', 'vendors-js', 'app-css', 'app-js'];

    tasks.forEach(function (val) {
        gulp.start(val);
    });
});