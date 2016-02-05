var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var del = require('del');
var isparta = require('isparta');

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

gulp.task('static', function () {
  return gulp.src('lib/**/*.js')
    .pipe(excludeGitignore())
    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

// gulp.task('pre-test', function () {
//   return gulp.src('lib#<{(||)}>#*.js')
//     .pipe(excludeGitignore())
//     .pipe(istanbul({
//       includeUntested: true,
//       instrumenter: isparta.Instrumenter
//     }))
//     .pipe(istanbul.hookRequire());
// });
//
// gulp.task('test', ['pre-test'], function (cb) {
//   var mochaErr;
//
//   gulp.src('test#<{(||)}>#*.js')
//     .pipe(plumber())
//     .pipe(mocha({reporter: 'spec'}))
//     .on('error', function (err) {
//       mochaErr = err;
//     })
//     .pipe(istanbul.writeReports())
//     .on('end', function () {
//       cb(mochaErr);
//     });
// });
//
gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js'], ['babel','static']);
});

gulp.task('babel', ['clean'], function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static']);
