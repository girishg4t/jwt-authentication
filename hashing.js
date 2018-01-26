const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 10
}


var token = jwt.sign(data, 'abc123');
console.log(token);

// var message = 'test i';

// var hash = SHA256(message).toString();


// console.log(message);
// console.log(hash);


// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//  var resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();


// if (resultHash === token.hash) {
//     console.log("Success");
// } else {
//     console.log("error");
// }