
var bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(plainText) {
    var hash = bcrypt.hashSync(plainText, saltRounds);
    return hash;
}

function isMatched(plainText, hash) {
return bcrypt.compareSync(plainText, hash); 
}


module.exports.isMatched = isMatched;
module.exports.encrypt = encrypt;
