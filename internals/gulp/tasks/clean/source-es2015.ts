/**
 * Cleanup
 */
import * as debugMod from 'debug';
import * as fs from 'fs-extra';
import * as gulp from 'gulp';
import { PATH_BUILD_ES2015 } from '../../config';

gulp.task('clean:src-es2015', (done: Function) => {
  const debug = debugMod('task-clean-source');
  fs.remove(PATH_BUILD_ES2015, (er) => {
    if (!er) {
      debug(`Deleted dir: ${PATH_BUILD_ES2015}`);
    }
    done();
  });
});
