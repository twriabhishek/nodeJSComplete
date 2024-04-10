const fs = require("fs");

// fs.writeFileSync("./data.txt", "Hello Rahul guys I am a writeFileSync");

//  fs.writeFile("./data.txt", "Hello guys I am a writeFile", ()=>{});


// const data= fs.readFileSync("./data.txt", "utf-8");
// console.log(data);



// fs.readFile("./data.txt", "utf-8", (err, result)=>{
//     if(err){
//         console.log("Error:", err);
//     }
//     else{
//         console.log(result);
//     }
// });


// fs.copyFile("./data.txt", "./copy.txt", ()=>{});


// fs.unlink("./copy.txt", ()=>{});


const data = fs.statSync("./data.txt");
console.log(data);



//1)Jo FS hai wo ek builtin module hai node js m jiski help s hum file handling kartey hai.
//2)FS m bahut sarey builtin method hotey hai like as file m kuch add karna, file s kuch delete karna, file m kuch append
//karna, file create karna, file copy karna.
//3)Yeh method sync, async 2 types ke hotey hai.
//4)Joki blocking and non-blocking request ke concept par based hai.
//4.1)Jab hum sync ka use kartey hai then wo kuch result m return karta hai.
//4.2)Jab hum async ka use kartey hai then yeh ek call back expect karta hai.


