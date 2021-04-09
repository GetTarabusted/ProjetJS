// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require('@tensorflow/tfjs-node-gpu');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');

const {concatWithPath} = require('./app/file-system-functions');

const getPictureList = (dir) => {
    const files = fs.readdirSync(dir);
    return files.filter(function (file) {
        return /jpg/.test(file)
    });
};

const transformStringToPath = (string) => './'+string;

const getPngPaths = (dir) => R.map(transformStringToPath, getPictureList(dir));

const readJpg = async (path) => jpeg.decode(await fs.readFile(path), true);

// Etape 1 : ajout du path à predict

const addPathToPrediction = (pathList, predictionList) =>


(async () => {
    const imgList = await Bromise.map(
        getPngPaths('./'),
        readJpg
    );

    // Load the model.
    const model = await cocoSsd.load();

    // Classify the image.
    const predictions = await Bromise.map(imgList, (x) => model.detect(x));


    console.log('Predictions: ');
    console.log(R.flatten(predictions));


})();