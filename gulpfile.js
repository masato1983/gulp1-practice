const {src, dest} = require('gulp');

function copyFiles(){
  return src('./src/**/*.html')
    .pipe(dest('./dist'));
}

exports.copyFiles = copyFiles;