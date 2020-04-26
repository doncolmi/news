const axios = require("axios");

const main = {
    checkSet : async (id) => {
        const set = await axios.get('http://localhost:8080/set?id=' + id);
        console.log(set.data);
        return set.data;
    },
    comment : async (id) => {
        await axios.get('http://localhost:8080/set/comment?id=' + id);
    }
}

module.exports = main;