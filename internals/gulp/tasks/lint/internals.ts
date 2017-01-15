/**
 * Lint internals
 */
import * as gulp from 'gulp';
import {
  PATH_INTERNALS,
} from '../../config';
import { getLinterTslintStream } from './utils/get-linter-tslint-stream';

gulp.task('lint:internals', () => {
  return getLinterTslintStream({
    src: [`${PATH_INTERNALS}/**/*.{ts,tsx}`, '!**/*.d.ts'],
  });
});
