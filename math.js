/* function add(a,b){
    return a + b;
}

module.exports = add;

function sub(a,b){
    return a-b;
}

module.exports = sub; */

// now the module new value would be the subract function thus overwrite ocurs//

/* 
PS C:\Users\adity\Desktop\VS File\Node> node hello
hey there
[Function: sub]
-1
PS C:\Users\adity\Desktop\VS File\Node>
*/


// so to resolve this we use js objects//

/*  

module.exports = {
    addfn : add,
    subfn : sub,
}; 

*/

// or

exports.add1 = (a,b) => a+b;
exports.sub1 = (a,b) => a-b;


