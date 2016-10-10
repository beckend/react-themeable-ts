/**
 * Build - output sourcemap and typings
 */
import * as gulp from 'gulp';
import { Project } from 'gulp-typescript';
import * as gTs from 'gulp-typescript';
import * as gDebug from 'gulp-debug';
import * as gFilter from 'gulp-filter';
import * as mergeStream from 'merge2';

const gSourcemaps = require('gulp-sourcemaps');

interface IGetBuildStream {
  // gulp.dest
  dest: string;
  // gulp-typescript .createProject output
  tsProject: Project;
  // taskName for debugging
  taskName: string;
}
export const getBuildStream = ({ dest, tsProject, taskName }: IGetBuildStream) => {
  // tsconfig does not correctly exclude files
  // So exclude it here.
  const fileFilter = gFilter([
    '**',
    '!**/*.spec.*',
  ]);

  const tsResult = tsProject.src()
    .pipe(fileFilter)
    .pipe(gSourcemaps.init())
    .pipe(tsProject(
      gTs.reporter.fullReporter(true)
    ));

  // Write js files
  const jsStream = tsResult.js
    .pipe(gDebug({
      title: `${taskName}-write-js: `,
    }))
    .pipe(gSourcemaps.write('.'))
    .pipe(gulp.dest(dest));

  // Write typings
  const dtsStream = tsResult.dts
    .pipe(gDebug({
      title: `${taskName}-write-dts: `,
    }))
    .pipe(gulp.dest(dest));

  return mergeStream([
    jsStream,
    dtsStream,
  ]);
};
