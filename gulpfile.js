const {src, dest} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();

function copyFiles(){
  return src('./src/**/*.html')
    .pipe($.rename({
      prefix: 'hello-'
    }))
    .pipe(dest('./dist'));
}

exports.copyFiles = copyFiles;

function icon(){
  return src('./src/images/favicon.png')
    .pipe($.imageResize({
      width: 100,
      height: 100,
      crop: true,
      upscale: false
    }))
    .pipe($.imagemin())
    .pipe(dest('./dist/images'));
}

exports.icon = icon;