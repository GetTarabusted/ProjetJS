const R = require('ramda');
const fs = require('fs-extra');
const Bromise = require('bluebird');

const getPictureListMaisBien = R.pipe(
    fs.readdirSync,
    R.filter(R.test(/\.jpg$/))
);

const concatWithImagePath = path => R.pipe(
    getPictureListMaisBien,
    R.map(R.concat(`${path}/`))
)(path);



const tester = async () => {
    console.log(await concatWithImagePath('./images'));
};




module.exports = {concatWithImagePath};
