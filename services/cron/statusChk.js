const axios = require('axios');

const statusChk = async function() {
    let res = true;
    await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/status")
        .catch(err => {res = false;});
    console.log(res);
    return res;
}

module.exports = statusChk;