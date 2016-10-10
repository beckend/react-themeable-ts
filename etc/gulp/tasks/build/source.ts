/**
 * es5 build
 */
import * as gulp from 'gulp';
import * as path from 'path';
import {
  PATH_SRC,
  PATH_BUILD,
} from '../../config';
import { createProject } from 'gulp-typescript';
import { getBuildStream } from './utils/get-build-stream';

const taskName = 'build:src';

gulp.task(taskName, () => {
  const tsProject = createProject(
    path.join(PATH_SRC, 'tsconfig.json')
  );

  return getBuildStream({
    taskName,
    tsProject,
    dest: PATH_BUILD,
  });
});
