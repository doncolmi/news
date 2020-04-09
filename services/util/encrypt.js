const crypto = require('crypto');

const getEncPw = (pw) => (
    crypto
    .createHash("sha512")
    .update(pw + (Math.round((new Date().valueOf() * Math.random())) + ""))
    .digest("hex")
);

module.exports = getEncPw;