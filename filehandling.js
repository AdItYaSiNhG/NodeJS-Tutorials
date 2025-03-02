const fs = require("fs");
// fs = file system module 
//built in module to interact with files

//sync
// --- fs.writeFileSync('./test.txt',"hey");

//async
fs.writeFile("./test.txt", "hello Async", (err)=> {});
// Async needs the call back and an error handling

//sync
const rst = fs.readFileSync("./readfile.txt","utf-8");
console.log(rst);


console.log("Async readfiles");
//async
fs.readFile("./readfile.txt", "utf-8", (err, data) => {
    if (err) 
    {
        console.log("Error",err);
    } 
    else 
    {
        console.log(data);
    }
});

//append 

fs.appendFileSync("./test.txt",'\nhi there');
console.log(fs.statSync("./test.txt"));