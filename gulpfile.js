const {src, dest, watch} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
const pkg = require('./package.json');
const conf = pkg["gulp-config"];
const sizes = conf.sizes;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();

function copyFiles(){
  return src('./src/**/*.html')
    .pipe($.rename({
      prefix: 'hello-'
    }))
    .pipe(dest('./dist'));}

function icon(){
  return src('./src/images/favicon.png')
  .pipe($.imageResize({
    width: 100,
    height: 100,
    crop: true,
    upscale: false
  }))
  .pipe($.imagemin())
    .pipe(dest('./dist/images'));}

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
  done();}

function styles() {
  return src('./src/sass/main.scss')
  .pipe($.sourcemaps.init())
  .pipe($.sass())
  .pipe($.postcss([
    autoprefixer()
  ]))
  .pipe($.sourcemaps.write('.'))
  .pipe(dest('./dist/css'))}

function scripts(){
  return src('./src/js/*.js')
  .pipe($.sourcemaps.init())
  .pipe($.babel())
  .pipe($.sourcemaps.write('.'))
  .pipe(dest('./dist/js'))}

function startAppServer(){
  server.init({
    server: {
      baseDir: './dist'
    }
  })
  watch('./src/**/*.scss', styles);
  watch('./src/**/*.scss').on('change', server.reload);}

exports.copyFiles = copyFiles;
exports.icon = icon;
exports.favicon = favicon;
exports.styles = styles;
exports.scripts = scripts;
exports.serve = startAppServer;