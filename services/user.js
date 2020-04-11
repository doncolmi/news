const joinUser = require("../models/user/joinModel");
const encrypt = require("./util/encrypt");
const axios = require("axios");

const main = {
    join : async (data) => {
       const encPw = await encrypt(data.pw);
       return await joinUser(data.id, encPw.pw, data.email, encPw.salt).saveUser();
    },
    vali : async (data, type) => {
        const res = await axios.get('http://localhost:8080/user?data=' + data + "&type=" + type);
        return res.data;
    }
}
module.exports = main;
