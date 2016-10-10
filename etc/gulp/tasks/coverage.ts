/**
 * Run jest and collect coverage
 */
import * as gulp from 'gulp';
import {
  PATH_PACKAGE,
} from '../config';

gulp.task('coverage', (done: Function) => {
  const gRun = require('gulp-run');
  const pkg = require(PATH_PACKAGE);
  const cmdRunJest = new gRun.Command(pkg.scripts['test:coverage']);
  return cmdRunJest.exec(null, done);
});
