const {src, dest} = require('gulp');
const rename = require('gulp-rename');

function copyFiles(){
  return src('./src/**/*.html')
    .pipe(rename({
      prefix: 'hello-'
    }))
    .pipe(dest('./dist'));
}

exports.copyFiles = copyFiles;