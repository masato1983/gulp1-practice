const {src, dest} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
const sizes = [
  [ 16, 16 ],
  [ 32, 32 ],
  [ 48, 48 ],
  [ 57, 57 ],
  [ 76, 76 ],
  [ 120, 120 ],
  [ 128, 128 ],
  [ 152, 152 ],
  [ 167, 167 ],
  [ 180, 180 ],
  [ 192, 192 ],
  [ 512, 512 ],
];

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

function favicon(done) {
  for(let size of sizes){
    let width = size[0];
    let height = size[1];
    src('./src/images/favicon.png')
    .pipe($.imageResize({
      width,
      height,
      crop: true,
      upscale: false
    }))
    .pipe($.imagemin())
    .pipe($.rename(`favicon-${width}×${height}.png`))
    .pipe(dest('./dist/images'));
  }
  done();
}

exports.favicon = favicon