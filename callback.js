const fs = require('fs');
function readFileCallback(err,data){
    err = "file not found"
    if(err) {
        console.error('error reading file:',err);
    }
    else{
        console.log('file contents:',data);
    }
}
fs.readFile('readfil.txt','utf-8',readFileCallback);