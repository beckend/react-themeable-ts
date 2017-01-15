/* tslint:disable: no-console */
/**
 * es5 build
 */
import { cmdSpawn } from 'cmd-spawn';
import * as debugMod from 'debug';
import * as gulp from 'gulp';

gulp.task('build:src-es5', async () => {
  const cmd = './node_modules/typescript/bin/tsc --p src/tsconfig-es5.json';
  const debug = debugMod('task-test');
  debug(`running: ${cmd}`);
  const r = await cmdSpawn(cmd, { buffer: true });
  if (r) {
    console.log(r.stdout);
  }
  debug(`finish: ${cmd}`);
});
