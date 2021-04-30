// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.

const R = require('ramda');

const { loadImages, createAnimalDirectory} = require('./app/file-system-functions');
const {predictImages} = require('./app/IA/predict');

const tester = R.pipeWith(R.andThen, [
    loadImages,
    predictImages,
    createAnimalDirectory('./results/'),
    // MoveImages,
    // SaveToDb
    // R.tap(R.map(console.log))
]);

tester('./images/');


