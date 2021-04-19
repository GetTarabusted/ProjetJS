const R = require('ramda');
const Bromise = require('bluebird');

const bMap = R.curry((fn, list) => Bromise.map(list, fn));

module.exports = {bMap};
