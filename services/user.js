const axios = require("axios");
const joinUser = require("../models/user/joinModel");

const main = {
   getUser : async function(data) {
       let result;
       const url = "http://localhost:8080/user?uid=" + data;
       await axios.get(url)
           .then(res => {
               result = res.data;
           })
       return result;
   },
    join : async (data) => {
       const url = "http://localshot:8080/user";
       const encPw = "await 암호화 만들기"; // todo : 암호화 만들기
       return joinUser(data.id, encPw, data.email).saveUser();
    }
}
module.exports = main;

// todo : 이제 프론트 만들어야한다...
// todo : 그거 말고도 유저 관련된 부분 만들자.