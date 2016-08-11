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

// Used to clear out /dist folder when we run gulp
import del from 'del';


// Set default browser
const defaultBrowser = 'google chrome canary';

// Set path variables
const sassPath = 'src/sass/**/*.scss';
const jadePath = 'src/jade/*.jade';
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
  var YOUR_LOCALS = {
  	heading: {
      one: "Amazing heading here",
      two: "The secrets to making 1M in 24 hours",
    },
  	para: {
      one: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      two : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    imgs: {
      one: "https://images.unsplash.com/photo-1443827423664-eac70d49dd0d",
      two: "https://images.unsplash.com/photo-1436377734980-0ee004df570b",
      three: "https://images.unsplash.com/19/desktop.JPG"
    }
  };

  gulp.src(jadePath)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(evilicons())
    .pipe(gulp.dest(distPath))
});


gulp.task('imgs', function () {
  return gulp.src(imgPath)
    .pipe(changed(distPath))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(`${distPath}/img`))
});


// Clearing task
gulp.task('clean', function () {
  return del([
    'dist/**/*',
    // we don't want to clean this file though so we negate the pattern
    '!dist/img/'
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
