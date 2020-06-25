const axios = require("axios");
const log = console.log;

const main = {
    cnt : async (id, type) => {
        if (type !== "press" && type !== "topic") return 0;
        const url = process.env.ServerURL + '/cnt/' + type + '?id=' + id;
        const cnt = await axios.get(url).catch(e => log(e));
        return cnt.data;
    }
}

module.exports = main;
