// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require('@tensorflow/tfjs-node-gpu');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
let R = require('ramda');
const look = require('ramda-debug');
R = look.wrap(R);


const readJpg = async (path) => jpeg.decode(await fs.readFile(path), true);

const transformStringToPath = R.concat('./');

const getPictureList = (dir) => {
    const files = fs.readdirSync(dir);
    return files.filter(function (file) {
        return /jpg/.test(file)
    });
};



const getPngPaths = (dir) => R.map(transformStringToPath, getPictureList(dir));
// A CHANGER
const PngPaths = getPngPaths('./');

const getClassFromPrediction = (element) => element[0].class;

const createAnimalDir = (type) => {
    fs.ensureDir('./animals/' + type);
};

const countFiles = (dir) => fs.readdirSync('./animal/'+dir).length;

const createPath = R.curry((numberOfFiles, animal) => `./animal/${animal}/${animal * (numberOfFiles)}.jpg`);

const moveFile = R.curry((file, destinationPath) => fs.move(file, destinationPath));

const renameAndMove = (picture, numberOfFiles, animal) => {
    R.pipe(
        createPath,
        moveFile(picture)
    )(numberOfFiles, animal)
    console.log("The picture "+ picture + " was renamed and successfully moved.");
};

// (async () => {
//     const imgList = await Bromise.map(
//         PngPaths,
//         readJpg
//     );
//
//     // Load the model.
//     const model = await cocoSsd.load();
//
//     // Classify the image.
//     const predictions = await Bromise.map(imgList, (x) => model.detect(x));
//
//     console.log('Predictions: ');
//     console.log(R.flatten(predictions));
//
//     // A MODIFIER
//     const classlist = R.map(getClassFromPrediction, predictions);
//     console.log(classlist);
//     R.map(createAnimalDir, classlist);
//     R.map(renameAndMove(), PngPaths);
//
//     /* let index = 0;
//     for (const elem of predictions){
//         // on récupère l'attribut class qui définit l'animal
//         const animal = elem[0].class;
//
//         // on crée le dossier si ce n'est pas déjà fait
//         await fs.ensureDir('./' + animal);
//
//         // on compte le nombre files pour le nom de l'image
//         const numberOfFiles = fs.readdirSync('./'+animal).length;
//
//         // on rename l'image
//         const newpath = './' + animal + '/' + animal + (numberOfFiles) + '.jpg';
//         await fs.rename(PngPaths[index], newpath);
//         console.log("The picture "+ PngPaths[index] + " was renamed and successfully moved to " + newpath)
//         index +=1;
//     } */
//
//
// })();


