const fs = require('fs-extra');
//const Bromise = require('bluebird');
const R = require('ramda')


const transformStringToPath = (string) => './'+string;


const getPictureList = (dir) => {
    const files = fs.readdirSync(dir);
    return files.filter(function (file) {
        return /jpg/.test(file)
    });
};
const getPngPaths = (dir) => R.map(transformStringToPath, getPictureList(dir));






// Récupère la class d'un element de prédiction
const getClass = (element) => {
        return element[0].class;
    };

//create a directory with the type of animal as name if it doesnt exist
const createDir = (type) => {
    fs.ensureDir('./animals/' + type);
};

const countFiles = (dir) => fs.readdirSync('./animal/'+dir).length;

const renameAndMove = (picture, numberOfFiles, animal) => {
    const newpath = './animal/' + animal + '/' + animal + (numberOfFiles) + '.jpg'
    fs.rename(picture, newpath)
    console.log("The picture "+ picture + " was renamed and successfully moved to " + newpath)
};



//console.log(getPngPaths(path));
//console.log(getPictureList());
