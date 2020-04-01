const axios = require("axios");

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
}
module.exports = main;

// todo : 이제 프론트 만들어야한다...
// todo : 그거 말고도 유저 관련된 부분 만들자.