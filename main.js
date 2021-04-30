// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.

const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');

const {loadImages, createAnimalDirectory} = require('./app/file-system-functions');
const {predictImages} = require('./app/IA/predict');

const tester = R.pipeWith(R.andThen, [
    loadImages,
    predictImages,
    createAnimalDirectory('./results/'),
    // moveImages,
    // saveToDb
    //R.tap(R.map(console.log))
]);

tester('./images/');


