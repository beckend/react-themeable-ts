/**
 * Prepare for publish
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('prepare:publish', (gV4.series(
  gV4.parallel(
    'clean:all',
    'lint:all',
  ),

  'coverage',
  'build:all',
  'minify:all'
)));
