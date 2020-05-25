const axios = require("axios");

const main = {
    checkSet : async (id) => {
        const set = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/set?id=' + id);
        console.log(set.data);
        return set.data;
    },
    comment : async (id) => {
        await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/set/comment?id=' + id);
    }
}

module.exports = main;