module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    'react/no-children-prop': ['error', { 
      allowFunctions: false,
      // Add an exception for GuestSelector component
      ignore: ['GuestSelector'] 
    }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
  }
}
