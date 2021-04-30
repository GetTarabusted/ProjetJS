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

// Str -> str -> Promise(Object)
// RootPath -> imageName -> Promise({path, image})
const readImage_ = (rootPath) => R.pipe(
    R.concat(rootPath),
    R.objOf('path'),
    R.converge(R.assoc('image'), [readJpgFromPath_, R.identity]),
    Bromise.props
    );

// Str -> Promise(List)
// RootPath -> Promise([{path, image}])
const loadImages = (rootPath) => R.pipe(
    fs.readdir,
    R.andThen(bMap(readImage_(rootPath)))
)(rootPath);

// Rootpath -> dir creation
const createAnimalDirectory = (rootPath) => R.pipe(
    R.map(
        R.pipe(
            R.path(['prediction', '0', 'class']),
            R.concat(rootPath),
            fs.ensureDir
            )
        )
    );

const setBboxInPercent = (object) => {
    const image = readJpg(object.path);
    const lst = [image.width, image.height];
    object.bbox = R.zipWith(R.divide, object.bbox, R.concat(lst, lst));
    return object;
};

module.exports = {setBboxInPercent, readJpg, loadImages, createAnimalDirectory};
