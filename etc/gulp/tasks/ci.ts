/**
 * CI task
 */
import * as gulp from 'gulp';

const gV4: any = gulp;

gulp.task('ci',  gV4.parallel('lint:all', 'test'));
