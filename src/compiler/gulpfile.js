/**
 * @name gulpfile.js
 * @description 打包项目css依赖
 */
import { resolveApp } from '../util'

const path = require("path");
const gulp = require("gulp");
const concat = require("gulp-concat");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const size = require("gulp-filesize");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");

const { name,browserList } = require(resolveApp("package.json"));

const DIR = {
  less: resolveApp("components/**/*.less"),
  buildSrc: [
    resolveApp("components/**/style.less"),
    resolveApp("components/**/index.less")
  ],
  lib: resolveApp("lib"),
  es: resolveApp("es"),
  dist: resolveApp("dist"),
};

gulp.task("copyLess", () => {
  return gulp
    .src(DIR.less)
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task("copyCss", () => {
  return gulp
    .src(DIR.buildSrc)
    .pipe(sourcemaps.init())
    .pipe(
      less({
        outputStyle: "compressed"
      })
    )
    .pipe(autoprefixer({ browsers: browserList }))
    .pipe(size())
    .pipe(cssnano())
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task("dist", () => {
  return gulp
    .src(DIR.buildSrc)
    .pipe(sourcemaps.init())
    .pipe(
      less({
        outputStyle: "compressed"
      })
    )
    .pipe(autoprefixer({ browsers: browserList }))
    .pipe(concat(`${name}.css`))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist))
    .pipe(sourcemaps.write())
    .pipe(rename(`${name}.css.map`))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist))

    .pipe(cssnano())
    .pipe(concat(`${name}.min.css`))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist))
    .pipe(sourcemaps.write())
    .pipe(rename(`${name}.min.css.map`))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist));
});

gulp.task("default", gulp.series(["copyLess", "copyCss", "dist"]));
