'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('copy-css', function () {
  return gulp.src('src/**/*.css')
    .pipe(replace(/.*/g, ' '))
    .pipe(gulp.dest('dist-server/src/'))
});