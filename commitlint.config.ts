import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
  /*
   * Resolve and load conventional-changelog-atom from node_modules.
   * Referenced packages must be installed
   */
  // parserPreset: 'conventional-changelog-atom',
  /*
   * Resolve and load @commitlint/format from node_modules.
   * Referenced package must be installed
   */
  // formatter: '@commitlint/format',
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    'type-enum': [2, 'always', ['FEAT', 'MERGE', 'UPDATE', 'FIX', 'PU', 'DEPLOY', 'RF', 'DOCS', 'ETC', 'STYLE', 'REVERT']],
    'type-case': [2, 'always', 'upper-case'],
    'scope-enum': [2, 'always', ['types', 'utils', 'view', 'stream', 'etc', 'root']],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
  },
  /*
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [commit => commit === ''],
  /*
   * Whether commitlint uses the default ignore rules.
   */
  defaultIgnores: true,
  /*
   * Custom prompt configs
   */
  prompt: {
    messages: {},
    questions: {
      type: {
        description: 'please input type:',
      },
    },
  },
};

module.exports = Configuration;
