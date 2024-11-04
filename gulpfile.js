

const gulp = require('gulp')


require('./gulp/dev.js');
require('./gulp/docs.js');




gulp.task('default', gulp.series(
  'clean:dev',
  gulp.parallel('html:dev', 'sass:dev', 'imgs:dev', 'fonts:dev', 'files:dev', 'js:dev'),
  gulp.parallel('server:dev', 'watch:dev')
));

gulp.task('docs', gulp.series(
  'clean:docs',
  gulp.parallel('html:docs', 'sass:docs', 'imgs:docs', 'fonts:docs', 'files:docs', 'js:docs'),
  gulp.parallel('server:docs')
));

