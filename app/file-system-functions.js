const R = require('ramda');
const fs = require('fs-extra');
const Bromise = require('bluebird');
const jpeg = require('jpeg-js');

const {bMap} = require('./functional-utils')

const readJpg = async (path) => jpeg.decode(await fs.readFile(path), true);

const getPictureListMaisBien = R.pipe(
    fs.readdir,
    R.andThen(R.filter(R.test(/\.jpg$/)))
);

const concatWithImagePath = path => R.pipe(
    getPictureListMaisBien,
    R.map(R.concat(`${path}/`))
)(path);



const tester = async () => {
    console.log(await concatWithImagePath('./images'));
};

const readJpgFromPath_ = R.pipe(R.prop('path'), readJpg);

// str -> str -> Promise(Object)
// rootPath -> imageName -> Promise({path, image})
const readImage_ = rootPath => R.pipe(
    R.concat(rootPath),
    R.objOf('path'),
    R.converge(R.assoc('image'), [readJpgFromPath_, R.identity]),
    Bromise.props
);

// str -> Promise(List)
// rootPath -> Promise([{path, image}])
const loadImages = rootPath => R.pipe(
    fs.readdir,
    R.andThen(bMap(readImage_(rootPath)))
)(rootPath);

// rootpath -> dir creation
const createAnimalDirectory = rootPath => R.pipe(
    R.map(
        R.pipe(
            R.path(['prediction', '0', 'class']),
            R.concat(rootPath),
            fs.ensureDir
        )
    )
);

const setBboxInPercent = (obj) => {
    let image = readJpg(obj.path);
    let lst = [image.width, image.height];
    obj.bbox = R.zipWith(R.divide, obj.bbox, R.concat(lst, lst));
    return obj;
};


module.exports = {setBboxInPercent, readJpg, loadImages, createAnimalDirectory};
