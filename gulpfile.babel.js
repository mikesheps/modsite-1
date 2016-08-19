// 'use strict';

// Gotta have Gulp
import gulp from 'gulp';

// gulp.task('log', () => {
//   console.log('hello');
// });

// Used for live-reloading the browser when files are updated
import browserSync from 'browser-sync';

// Using Sass as our pre-processor
import sass from 'gulp-sass';

// Enabling sourcemaps to map to our various .scss files
import sourcemaps from 'gulp-sourcemaps';

// Handle browser prefixes for us
import autoprefixer from 'gulp-autoprefixer'

// Using Jade for templating
import jade from 'gulp-jade';

// Easy awesome icons
import evilicons from 'gulp-evil-icons';

// Handle error without breaking the stream
import plumber from 'gulp-plumber';

// Manage todo comments
import todo from 'gulp-todo';

// Only update things that have chnaged
import changed from 'gulp-changed';

// Image optimization modules
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

// Data content
import lorem from './src/jade/data/lorem';
import images from './src/jade/data/images';
import navutility from './src/jade/data/nav-utility';
import nav from './src/jade/data/nav';
import feature from './src/jade/data/feature';
import brief from './src/jade/data/brief';
import gallerystudies from './src/jade/data/gallery-studies';
import pitch from './src/jade/data/pitch';
import galleryclients from './src/jade/data/gallery-clients';

// Make one big data object to pass into Jade
const data = Object.assign({},
  lorem,
  images,
  navutility,
  nav,
  feature,
  brief,
  gallerystudies,
  pitch,
  galleryclients);

// import {data} from './src/jade/data/data';

// Used to clear out /dist folder when we run gulp
import del from 'del';


// Set default browser
const defaultBrowser = 'google chrome canary';

// Set path variables
const sassPath = 'src/sass/**/*.scss';
const jadePath = 'src/jade/pages/*.jade';
const distPath = './dist';
const imgPath = 'src/img/**/*';

// Sass Options
const sassOptions = {
  errLogToConsole: true,
  indentedSyntax: false
};


// Autoprefixer options
const autoprefixerOptions = {
  browsers: [
    'last 2 versions',
    '> 5%',
    'Firefox ESR'
  ]
};

// BrowserSync Settings and task
browserSync.create();
// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade', 'imgs'], function() {
  browserSync.init({
    server: distPath,
    browser: defaultBrowser
  });

  gulp.watch(sassPath, ['sass']);
  gulp.watch(jadePath, ['jade']);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('src/sass/**/style.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
  	.pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(distPath))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  gulp.src(jadePath)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jade({
      locals: data,
      pretty: true
    }))
    .pipe(evilicons())
    .pipe(gulp.dest(distPath))
});


gulp.task('imgs', function () {
  return gulp.src(imgPath)
    .pipe(changed('dist/img'))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(`${distPath}/img`))
});


// Clearing task
gulp.task('clean', function () {
  return del([
    //'dist/**/*',
    'dist/index.html',
    'dist/style.css'
    // we don't want to clean this file though so we negate the pattern
    //'!dist/img'
  ]);
});


// Default task to run
gulp.task('default', ['clean', 'serve']);



// Todo task
gulp.task('todo', () => {
 gulp.src([sassPath, jadePath])
   .pipe(todo({
     customTags: ['NOTES']
   }))
   .pipe(gulp.dest('./'))
   // -> Will output a TODO.md with your todos
})
