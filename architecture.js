/* 
client --------------> request made to server made on node js
request goes into event queues
then the request goes to event loop that watches queue grabs the request in FIFO order
request made by client can be of two types:
1)blocking operation/Sync tasks
2)non- blocking operation/Async tasks

--> if non blocking then the process is done and result is send to client.
--> if blocking then, the request goes to thread pool, if thread available in thread pool 
then that thread will process the request and return the result to client and goes back 
to the thread pool after the task is done.

this causes scalebility issues as the waiting time increases.

default thread pool size = 4
max? - 8 core cpu = 8 thread

NOTE: WE SHOULD ALWAYS USE NON BL0CKING OPERATIONS*/

const fs = require("fs");
//2
const os = require('os');
console.log(os.cpus().length);

//sync
console.log(1);
const rst = fs.readFileSync('./readfile.txt','utf-8');
console.log(rst);

console.log(2);
console.log(3+4);


//async
console.log('async');
console.log(1);
fs.readFile('./readfile.txt','utf-8', (err, data) => {
    if(err) console.log(err);
    console.log(data);
});

console.log(2);
console.log(2+4);