/**
 * Typescript globs are broken, delete compiled test from build
 */
import * as gulp from 'gulp';
import * as fs from 'fs-extra';
import {
  PATH_BUILD,
  PATH_BUILD_ES2015,
} from '../../config';
import * as debugMod from 'debug';
import * as Bluebird from 'bluebird';

const pRemove: any = Bluebird.promisify(fs.remove);
const globby = require('globby');

/**
 * Because typescript sux with globs it fails to match corretly and we end up with garbage files inside src folder
 */
gulp.task('monkey:delete-test-from-build', async () => {
  const debug = debugMod('task-monkey:delete-test-from-build');
  const filePaths: string[] = await globby([
    `${PATH_BUILD}/**/__test__`,
    `${PATH_BUILD_ES2015}/**/__test__`,
  ]);
  if (filePaths.length < 1) {
    return;
  }
  const delPromises: Bluebird.Thenable<any>[] = [];
  filePaths.forEach((filePath) => {
    delPromises.push(
      pRemove(filePath)
        .then(() => {
          debug(`Deleted DIR: ${filePath}`);
        })
    );
  });

  return Bluebird.all(delPromises);
});
