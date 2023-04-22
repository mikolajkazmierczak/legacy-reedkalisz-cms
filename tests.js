// import pluralize from 'pluralize';
// import fs from 'fs/promises';

// function kebabToPascal(string) {
//   // file-name -> FileName
//   const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);
//   const words = string.split('-');
//   const Words = words.map(word => capitalize(word));
//   return Words.join('');
// }

// console.log(kebabToPascal(pluralize('__index', 1)));

// async function readDir(path) {
//   try {
//     return await fs.readdir(path);
//   } catch (err) {
//     return null;
//   }
// }

// console.log(await readDir('./server/routes'));
// console.log(await readDir('./server/routes/dupa'));

let test = 'hello';
let test2 = ['hello'];
console.log([].concat(test));
console.log([].concat(test2));
