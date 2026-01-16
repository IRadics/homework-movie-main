import antfu from '@antfu/eslint-config'
import frontendNuxtConfig from './apps/web/.nuxt/eslint.config.mjs'

export default frontendNuxtConfig(
  await antfu(
    {
      typescript: true,
      vue: true,
    },
    {
      files: ['apps/api/**'],
      rules: {
        'ts/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    {
      rules: {
        'style/no-trailing-spaces': ['error', { ignoreComments: true }],
        'style/max-statements-per-line': ['error', { max: 2 }],
        'antfu/no-top-level-await': 'off',
      },
    },
    {
      files: ['**/*.vue'],
      rules: {},
    },
    {
      files: ['**/*.md'],
      rules: {
        'style/no-trailing-spaces': 'off',
      },
    }
  )
)
