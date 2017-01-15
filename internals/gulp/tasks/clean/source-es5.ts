/**
 * Cleanup
 */
import * as debugMod from 'debug';
import * as fs from 'fs-extra';
import * as gulp from 'gulp';
import { PATH_BUILD_ES5 } from '../../config';

gulp.task('clean:src-es5', (done: Function) => {
  const debug = debugMod('task-clean-source');
  fs.remove(PATH_BUILD_ES5, (er) => {
    if (!er) {
      debug(`Deleted dir: ${PATH_BUILD_ES5}`);
    }
    done();
  });
});
