const fs = require('fs');
const os = require('os');

console.log(os.cpus().length);







// console.log("Entry");



//Synchronous task means blocking request
// const data=fs.readFileSync('./JSWorking.txt', 'utf-8');
// console.log(data);



//Asynchronous task means non-blocking request
// fs.readFile('./JsWorking.txt', 'utf-8', (err, result)=>{
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log(result);
//     }
// })

// console.log("Exit");