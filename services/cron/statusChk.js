const axios = require('axios');

const statusChk = async function() {
    let res = true;
    await axios.get("http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/status")
        .catch(err => {res = false;});
    console.log(res);
    return res;
}

module.exports = statusChk;