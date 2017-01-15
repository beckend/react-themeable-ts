import * as gulp from 'gulp';
import * as gDebug from 'gulp-debug';
import gTslint from 'gulp-tslint';
// import { Linter } from 'tslint';
import * as tslint from 'tslint';
import {
  PATH_TSLINT_DEFAULT,
  // PATH_TSCONFIG_DEFAULT,
  // PATH_ROOT
} from '../../../config';

const tslintStylish = require('tslint-stylish');

interface IGetLinterTslintStreamArgs {
  // used in gulp.src
  readonly src: string | string[];
  readonly srcOpts?: gulp.SrcOptions;
  // see https://github.com/panuhorsmalahti/gulp-tslint typings are not up to date
  readonly tslintOpts?: any;
  // outdated typings
  readonly tslintReportOpts?: any;
}
export const getLinterTslintStream = ({ src, srcOpts }: IGetLinterTslintStreamArgs) => {
  // const program = Linter.createProgram(PATH_TSCONFIG_DEFAULT, PATH_ROOT);
  return gulp.src(src, srcOpts || {})
    .pipe(gDebug({ title: 'Lint file:' }))
    .pipe(gTslint({
      // program,
      tslint,
      configuration: PATH_TSLINT_DEFAULT,
      formatter: 'verbose',
    }))
    .pipe((gTslint as any).report(
      tslintStylish,
      {
        emitError: true,
        summarizeFailureOutput: true,
      },
    ));
};
