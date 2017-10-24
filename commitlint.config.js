'use strict';

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [1, 'always', 72],
    'lang': [1, 'always', 'eng'],
    'scope-case': [2, 'always', 'lowerCase'],
    'scope-empty': [2, 'never'],
    'subject-case': [1, 'always', 'lowerCase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-tense': [2, 'always', ['past-tense', 'present-imperative']],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore']
    ],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lowerCase']
  }
};
