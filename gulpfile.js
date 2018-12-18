let gulp = require("gulp");
let sass = require("gulp-sass");
let server = require("gulp-webserver");
let fs = require("fs");
let url = require("url");
let path = require("path");


gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});