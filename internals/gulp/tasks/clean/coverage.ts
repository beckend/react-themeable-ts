/**
 * Cleanup
 */
import * as debugMod from 'debug';
import * as fs from 'fs-extra';
import * as gulp from 'gulp';
import { PATH_COVERAGE } from '../../config';

gulp.task('clean:coverage', (done: Function) => {
  const debug = debugMod('task-clean-coverage');
  fs.remove(PATH_COVERAGE, (er) => {
    if (!er) {
      debug(`Deleted dir: ${PATH_COVERAGE}`);
    }
    done();
  });
});
