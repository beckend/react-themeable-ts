/**
 * Variables used in gulp tasks
 */
import * as path from 'path';

/**
 * Folders
 */
export const DIR_SRC = 'src';
export const DIR_COVERAGE = 'coverage';
export const DIR_ETC = 'etc';
export const DIR_BUILD_ES5 = 'build-es5';
export const DIR_BUILD_ES2015 = 'build-es2015';
export const DIR_BUILD_ES2017 = 'build-es2017';
export const DIR_NODE_MODULES = 'node_modules';

/**
 * Files
 */
export const FILE_PACKAGE = 'package.json';
export const FILE_TSCONFIG_DEFAULT = 'tsconfig.json';
export const FILE_TSLINT_DEFAULT = 'tslint.json';

/**
 * Full paths
 */
export const PATH_ROOT = path.join(__dirname, '../..');
export const PATH_INTERNALS = path.join(PATH_ROOT, 'internals');
export const PATH_NODE_MODULES = path.join(PATH_ROOT, DIR_NODE_MODULES);
export const PATH_PACKAGE = path.join(PATH_ROOT, FILE_PACKAGE);
export const PATH_TSCONFIG_DEFAULT = path.join(PATH_ROOT, FILE_TSCONFIG_DEFAULT);
export const PATH_TSLINT_DEFAULT = path.join(PATH_ROOT, FILE_TSLINT_DEFAULT);
export const PATH_BUILD_ES5 = path.join(PATH_ROOT, DIR_BUILD_ES5);
export const PATH_BUILD_ES2015 = path.join(PATH_ROOT, DIR_BUILD_ES2015);
export const PATH_BUILD_ES2017 = path.join(PATH_ROOT, DIR_BUILD_ES2017);
export const PATH_ETC = path.join(PATH_ROOT, DIR_ETC);
export const PATH_GULP = path.join(PATH_ETC, 'gulp');
export const PATH_SRC = path.join(PATH_ROOT, DIR_SRC);
export const PATH_COVERAGE = path.join(PATH_ROOT, DIR_COVERAGE);
