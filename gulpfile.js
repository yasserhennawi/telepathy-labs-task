"use strict";

var gulp = require("gulp"),
  eslint = require("gulp-eslint"),
  nodemon = require("gulp-nodemon");

gulp.task("develop", function() {
  nodemon({
    exec: "node --inspect",
    script: "index.js",
    ext: "html js",
    env: { NODE_ENV: "development" }
  }).on("crash", nodemon.restart);
});
