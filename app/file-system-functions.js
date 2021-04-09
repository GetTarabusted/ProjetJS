const R = require('ramda');
const fs = require('fs-extra');
const Bromise = require('bluebird');

const getPictureListMaisBien = R.pipe(
    fs.readdir,
    R.andThen(R.filter(R.test(/\.jpg$/)))
);

const concatWithImagePath = x => R.pipe(
    getPictureListMaisBien,
    R.andThen(R.map(R.concat(`${x}/`)))
)(x);

const tester = async () => {
    console.log(await concatWithImagePath('./images'));
};

tester();


module.exports = {concatWithImagePath};
