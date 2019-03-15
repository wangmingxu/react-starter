const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 75,
      propList: ['*'],
      selectorBlackList: [/\s+body$/],
    }),
    autoprefixer,
    cssnano
  ],
};
