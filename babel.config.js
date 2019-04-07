module.exports = {
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ],
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
