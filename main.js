// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.

/* décommenter lorsqu'on rebasculera sur l'ia
require('@tensorflow/tfjs-node-gpu');
const cocoSsd = require('@tensorflow-models/coco-ssd');
*/
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');

const {mock_prediction} = require('./app/prediction')
const {concatWithImagePath} = require('./app/file-system-functions');

const predictions = mock_prediction();

const addPath = (obj, path) => obj.path = path


const tester = async () => {
    const paths = await concatWithImagePath('./images');
    R.zipWith(addPath, predictions, paths)
    console.log(predictions);
};

tester();
// R.map(addPathToPrediction(paths), predictions);


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

