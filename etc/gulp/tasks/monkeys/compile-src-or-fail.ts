/**
 * gulp-typescript does not auto fail typescript compilation...and there is no way to fail it
 */

import * as gulp from 'gulp';
import * as path from 'path';
import {
  PATH_SRC,
  FILE_TSCONFIG_DEFAULT,
  PATH_NODE_MODULES,
} from '../../config';
import * as debugMod from 'debug';

gulp.task('monkey:compile-src-or-fail', (done: Function) => {
  const gRun = require('gulp-run');
  const debug = debugMod('task-monkey:compile-src-or-fail');
  const tsCfgSrcPath = path.join(PATH_SRC, FILE_TSCONFIG_DEFAULT);
  const tscBinPath = path.join(PATH_NODE_MODULES, 'typescript/bin/tsc');
  const cmdRunJest = new gRun.Command(`${tscBinPath} --p ${tsCfgSrcPath}`);
  return cmdRunJest.exec(null, (er: any) => {
    if (er && er.status !== 0) {
      debug(er);
      process.exit(er.status);
    } else {
      done();
    }
  });
});
