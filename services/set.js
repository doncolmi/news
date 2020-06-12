const axios = require("axios");

const main = {
    checkSet : async (id) => {
        const set = await axios.get('http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/set?id=' + id);
        console.log(set.data);
        return set.data;
    },
    comment : async (id) => {
        await axios.get('http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/set/comment?id=' + id);
    }
}

module.exports = main;