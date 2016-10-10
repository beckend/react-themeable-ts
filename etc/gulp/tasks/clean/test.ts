/**
 * Cleanup
 */
import * as gulp from 'gulp';
import * as fs from 'fs-extra';
import { PATH_SRC } from '../../config';
import * as debugMod from 'debug';
import * as Bluebird from 'bluebird';

const pRemove: any = Bluebird.promisify(fs.remove);
const globby = require('globby');

/**
 * Because typescript sux with globs it fails to match correctly and we end up with garbage files inside src folder
 */
gulp.task('clean:test', async () => {
  const debug = debugMod('task-clean:test');
  const filePaths: string[] = await globby([`${PATH_SRC}/**/*.{js,map}`]);
  if (filePaths.length < 1) {
    return;
  }
  const delPromises: Bluebird.Thenable<any>[] = [];
  filePaths.forEach((filePath) => {
    delPromises.push(
      pRemove(filePath)
        .then(() => {
          debug(`Deleted: ${filePath}`);
        })
    );
  });

  return Bluebird.all(delPromises);
});
