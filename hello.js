console.log("hey there");

/* for running the js file in node 
S-1 first initialise the npm config. by "npm init " 
S-2 then in the start part include the js file name 

WHAT IS "package.json" file ?
It is a configuration file where we can create our own scripts, 
name our project, package & application install dependencies.*/

const math = require('fs');

console.log(math);  //this will give an empty object  //

//so we will make the module public by exporting//

// console.log(math.addfn(3,2) , math.subfn(3,2));
// console.log(addfn(3,2) ,subfn(3,2));
