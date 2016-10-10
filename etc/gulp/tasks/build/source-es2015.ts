/**
 * es2015 build
 */
import * as gulp from 'gulp';
import * as path from 'path';
import {
  PATH_SRC,
  PATH_BUILD_ES2015,
} from '../../config';
import { createProject } from 'gulp-typescript';
import { getBuildStream } from './utils/get-build-stream';

const taskName = 'build:src-es2015';

gulp.task(taskName, () => {
  const tsProject = createProject(
    path.join(PATH_SRC, 'tsconfig.es2015.json')
  );

  return getBuildStream({
    taskName,
    tsProject,
    dest: PATH_BUILD_ES2015,
  });
});
