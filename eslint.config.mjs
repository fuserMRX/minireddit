import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
    {
        rules: {
            'curly': 2,
            'quotes': [2, 'single'],
            'accessor-pairs': 2,
            'array-bracket-spacing': 2,
            'eqeqeq': 2,
            'id-match': 2,
            'new-parens': 2,
            'no-array-constructor': 2,
            'no-confusing-arrow': 2,
            'no-catch-shadow': 2,
            'no-div-regex': 2,
            'no-eq-null': 2,
            'no-eval': 2,
            'no-extend-native': 2,
            'no-floating-decimal': 2,
            'no-implied-eval': 2,
            'no-iterator': 2,
            'no-label-var': 2,
            'no-labels': 2,
            'no-lone-blocks': 2,
            'no-loop-func': 2,
            'no-nested-ternary': 2,
            'no-new-func': 2,
            'no-new-object': 2,
            'no-script-url': 2,
            'no-self-compare': 2,
            'no-sequences': 2,
            'no-shadow-restricted-names': 2,
            'no-sync': 2,
            'no-throw-literal': 2,
            'no-trailing-spaces': 2,
            'no-undef': 2,
            'no-undef-init': 2,
            'no-use-before-define': 2,
            'no-useless-concat': 2,
            'operator-linebreak': 2,
            'require-yield': 2,
            'semi': 2,
            'space-before-blocks': 2,
            'space-infix-ops': 2,
            'keyword-spacing': 2,
        },
    },
];

export default eslintConfig;
