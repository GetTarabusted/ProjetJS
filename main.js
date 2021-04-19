// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.

/* décommenter lorsqu'on rebasculera sur l'ia
require('@tensorflow/tfjs-node-gpu');
const cocoSsd = require('@tensorflow-models/coco-ssd');
*/
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');



const {concatWithImagePath, loadImages} = require('./app/file-system-functions');
const {predictImages} = require('./app/IA/predict');


const addPathToObject = path => R.assoc('path', path);

const zipPathsToPredictions = (obj) => {


    const x = R.zipWith(addPathToObject, obj, concatWithImagePath('./images'));
    console.log(x);
    console.log(obj);

    return obj;
};

const createAnimalDirectory = rootPath => R.pipe(
    R.prop('class'),
    R.concat(rootPath),
    fs.ensureDir
);

const tester = R.pipeWith(R.andThen, [
    loadImages,
    predictImages,
    // moveImages,
    // saveToDb
    R.tap(R.map(console.log))
]);


//    zipPathsToPredictions(predictions);
//    R.map(createAnimalDirectory('./images/'), predictions);

tester('./images/');


/* On commente tout ça parce qu'on a le mock pour gagner du temps d'execution pour le moment qui renvoie la même chose
    que si on cherchait le dossier images

const readJpg = async (path) => jpeg.decode(await fs.readFile(path), true);

(async () => {

    const imgList = await Bromise.map(
        concatWithImagePath('./images'),
        readJpg
    );

    // Load the model.
    const model = await cocoSsd.load();

    // Classify the image.
    const predictions = await Bromise.map(imgList, (x) => model.detect(x));

})();
 */

