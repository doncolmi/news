const crypto = require('crypto');
const getEncPw = (pw) => {
    const salt = (Math.round((new Date().valueOf() * Math.random())) + "");
    return {
        pw: crypto
            .createHash("sha512")
            .update(pw + salt)
            .digest("hex"),
        salt: salt
    };
};

module.exports = getEncPw;