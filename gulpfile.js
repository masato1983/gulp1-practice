const {src, dest} = require('gulp');

function copyFiles(){
  return src('./src/index.html')
    .pipe(dest('./dist'));
}

exports.copyFiles = copyFiles;