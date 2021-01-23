const {src, dest} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
const pkg = require('./package.json');
const conf = pkg["gulp-config"];
const sizes = conf.sizes;
const autoprefixer = require('autoprefixer');

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

exports.favicon = favicon;

function styles() {
  return src('./src/sass/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.postcss([
      autoprefixer()
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./dist/css'))
}

exports.styles = styles;