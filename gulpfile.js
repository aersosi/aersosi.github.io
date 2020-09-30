const dotenv = require("dotenv"); // Read Environment Variables
const gulp = require("gulp"); // Task runner
const debug = require('gulp-debug');

const sourcemaps = require("gulp-sourcemaps"); // Creates a source map for minimized code that points back to the preminized version
const concat = require("gulp-concat"); // Join files together
const imagemin = require('gulp-imagemin'); // Minify images
const cleanCSS = require("gulp-clean-css"); // Minification of CSS
const sass = require("gulp-sass"); // Transpile sass to css
const autoprefixer = require("gulp-autoprefixer"); // Adds Auto Prefix for CSS styles such as webkits in css
const uglify = require("gulp-uglify-es").default; // Obfuscate JS files
const babel = require("gulp-babel"); // Transform latest ES code to ES5
const includeJs = require('gulp-browser-js-include');

// Paths
let source_js_path = `./src/js/`;
let source_css_path = `./src/css/`;

let dist_js_path = `./dist/js/`;
// ${dist_js_path}
let dist_css_path = `./dist/css/`;
// ${dist_css_path}

// (Optional) define file order if not, leave an empty array []
let js_order = ['_scripts.js']; // Leave empty array if order of scripts does not matter
let css_order = ['_styles.css']; // Leave blank if order of scripts does not matter


js_order = js_order.length > 1 ? js_order.map(path => source_js_path.concat(path)) : [`${source_js_path}*.js`];
css_order = css_order.length > 1 ? css_order.map(path => source_css_path.concat(path)) : [`${source_css_path}*.css`];


// .pipe(debug( ))
/** Gulp Tasks **/
// CSS Static Tasks
gulp.task("transpileSassToCss", function () {
    console.log("Transpiling SASS / SCSS to CSS");
    return gulp.src(`./src/sass/_styles.sass`)
        // .pipe(sass.sync().on("error", sass.logError))
        .pipe(sass.sync())
        .pipe(gulp.dest(`./src/css/`));
});

gulp.task("formatCss", function () {
    console.log("Concatenating CSS");
    return gulp.src([...css_order])
        .pipe(sourcemaps.init()) // Initialize Source Map
        .pipe(autoprefixer())
        .pipe(cleanCSS()) // Optimise CSS
        .pipe(sourcemaps.write()) // Write to Source Map
        .pipe(concat("bundle.min.css")) // Create one CSS file
        .pipe(gulp.dest(`${dist_css_path}`));
});


//Javascript Tasks
gulp.task("transpileToEs5", function () {
    console.log("Transpiling JS --> ES5");
    return gulp.src(["node_modules/babel-polyfill/dist/polyfill.js", ...js_order])
        .pipe(sourcemaps.init()) // Initialize Source Map
        .pipe(includeJs())
        .pipe(babel({
            presets: ["@babel/env"],
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(concat("bundle.min.js"))
        .pipe(gulp.dest(`${dist_js_path}`));
});

// Copy and Optimise Image
gulp.task('copyOptimiseImage', function () {
    console.log('Copying and optimising image');
    return gulp.src(`./src/img/*`)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(`./dist/img`));
});

// Copy Fonts
// gulp.task('copyFonts', function () {
//     console.log('Copying Fonts');
//     return gulp.src(`./static_source/./fonts/*`)
//         .pipe(gulp.dest(`./static/./fonts`));
// });


// Watch Javascript and CSS files
gulp.task("watch", function () {
    console.log("File Watching has Started");
    // Watch static folder
    gulp.watch(`./static_source/./css/sass/**/*.sass`, gulp.series(["css"])); // Watch for SASS Changes
    gulp.watch(`./static_source/./css/css/*.css`, gulp.series(["formatCss"])); // Watch for CSS Changes
    gulp.watch(`./static_source/./js/**/*.js`, gulp.series(["transpileToEs5"])); // Watch for Javascript Changes

    // Watch image folder
    gulp.watch(`./src/img/*`, gulp.series(["images"]));

    // Watch fonts folder
    // gulp.watch(`./static_source/./fonts/*`, gulp.series(["fonts"]));

});

// Grouping tasks together
gulp.task("css", gulp.series(["transpileSassToCss", "formatCss"]));
gulp.task("js", gulp.series(["transpileToEs5"]));
gulp.task("img", gulp.series(["copyOptimiseImage"]));
// gulp.task("fonts", gulp.series(["copyFonts"]));


// Default function called by gulp
// gulp.task("default", gulp.series(["css", "js", "images", "fonts", "watch"])); // Compile CSS, JS and watch for file changes
gulp.task("default", gulp.series(["css", "js", "img", "watch"])); // Compile CSS, JS and watch for file changes
gulp.task("frontend", gulp.series(["css", "img", "watch"])); // Compile CSS and watch for file changes
// gulp.task("noimage", gulp.series(["css", "cssAdmin", "js", "fonts", "watch"])); // Compile CSS, JS and watch for file changes
