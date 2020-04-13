const crypto = require('crypto');
const getEncPw = {
    joinEncPw : (pw) => {
        const salt = (Math.round((new Date().valueOf() * Math.random())) + "");
        return {
            pw: crypto
                .createHash("sha512")
                .update(pw + salt)
                .digest("hex"),
            salt: salt
        };
    },
    getEncPw : async (pw, salt) => {
        return crypto.createHash("sha512").update(pw + salt.data).digest("hex");
    }

}


module.exports = getEncPw;