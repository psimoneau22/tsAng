var gulp = require('gulp');
var del = require('del');

gulp.task('cleanJs', function(cb){
	del("app/**/*.js", cb);
});