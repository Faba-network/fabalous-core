var gulp = require('gulp');
var clean = require('gulp-clean');

var path = require('path');

var absolutePath = path.join(__dirname, '../../');

gulp.task('clean', function() {
    return gulp.src(absolutePath + 'lib/')
        .pipe(clean());
});

gulp.task('copy_src_to_lib', function() {
    return gulp.src(absolutePath + 'lib/src/**')
        .pipe(gulp.dest(absolutePath + 'lib/'));
});

gulp.task('remove_src_folder', function() {
    return gulp.src(absolutePath + 'lib/src', {read: false})
        .pipe(clean());
});

gulp.task('remove_node_modules_folder', function() {
    return gulp.src(absolutePath + 'lib/node_modules', {read: false})
        .pipe(clean());
});

gulp.task('copy_package_json', function() {
    return gulp.src('package.json')
        .pipe(gulp.dest(absolutePath + 'lib/'));
});

jasmine = require('gulp-jasmine');

gulp.task('test', function(){
    gulp.src('test/FabaServerSpec.js')
        .pipe(jasmine())
});