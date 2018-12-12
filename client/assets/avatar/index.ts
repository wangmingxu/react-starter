const context = require.context('./', false, /\.png$/)

const avatar = context.keys().sort((a, b) => {
    const pattern = /(\d+)\.png/;
    const [, index1] = a.match(pattern);
    const [, index2] = b.match(pattern);
    return Number(index1) - Number(index2)
}).map(key => context(key))

export default avatar;