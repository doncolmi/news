const axios = require("axios");

const main = {
   getUser : function(data) {
       let result;
       const url = "http://localhost:8080/user?uid=" + data;
       axios.get(url)
           .then(res => {
               result = res.data;
           })
   },
}
module.exports = main;