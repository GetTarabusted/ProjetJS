const R = require('ramda');
const Bromise = require('bluebird');

const {bMap} = require('../functional-utils')

//const {detect} = require('./detect');
const {detect} = require('./mock-detect');

const detectImage = R.pipe(R.prop('image'), detect)

const predictImage = R.pipe(
    R.converge(R.assoc('prediction'), [detectImage, R.identity]),
    Bromise.props,
);

const predictImages = bMap(predictImage);


module.exports = {predictImages};
