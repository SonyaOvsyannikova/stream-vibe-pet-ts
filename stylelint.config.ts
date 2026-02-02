export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    extends: [
      'stylelint-config-standard-scss',
      'stylelint-config-recess-order',
    ],
    plugins: ['stylelint-order'],
    rules: {
      // Пустые строки между селекторами
      'rule-empty-line-before': [
        'always-multi-line',
        {
          except: ['first-nested'],
          ignore: ['after-comment'],
        },
      ],

      // Пустые строки перед директивами (@include, @media)
      'at-rule-empty-line-before': [
        'always',
        {
          except: ['first-nested', 'blockless-after-same-name-blockless'],
          ignore: ['after-comment'],
        },
      ],

      // Отступы
      indentation: 2,

      // Максимум 1 пустая строка
      'max-empty-lines': 1,

      // Скобки на новой строке
      'block-opening-brace-newline-after': 'always',
      'block-closing-brace-newline-before': 'always',
      'block-closing-brace-empty-line-before': 'never',

      // Отключить мешающие правила
      'selector-class-pattern': null,
      'scss/dollar-variable-pattern': null,
      'scss/at-rule-no-unknown': null,

      // УБРАТЬ эту строку, т.к. она конфликтует с stylelint-config-recess-order
      // "order/order": [...]
    },
  },
}
