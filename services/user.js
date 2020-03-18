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