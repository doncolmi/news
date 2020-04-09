const joinUser = require("../models/user/joinModel");
const encrypt = require("./util/encrypt");

const main = {
    join : async (data) => {
       const encPw = await encrypt(data.pw);
       return await joinUser(data.id, encPw, data.email).saveUser();
    },
}
module.exports = main;

// todo : 이제 프론트 만들어야한다...
// todo : 그거 말고도 유저 관련된 부분 만들자.