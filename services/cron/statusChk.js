const axios = require('axios');

const statusChk = async function() {
    let res = true;
    await axios.get("http://localhost:8080/status")
        .catch(err => {res = false;});
    console.log(res);
    return res;
}

module.exports = statusChk;