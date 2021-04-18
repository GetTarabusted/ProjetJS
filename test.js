const fs = require('fs-extra');
//const Bromise = require('bluebird');
const R = require('ramda')


const add2 = (number) => number+2;
const add4 = (number) => number+4;
const addThreeNumbers = (n1, n2, n3) => n1+n2+n3;
const addOneNumber = R.curry(addThreeNumbers(1,2))
const resultat = R.pipe(add2, add4)
console.log(resultat)