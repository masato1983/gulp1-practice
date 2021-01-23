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