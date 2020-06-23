const axios = require("axios");

const main = {
  checkSet: async (id) => {
    const set = await axios.get(process.env.ServerURL + "/set?id=" + id);
    console.log(set.data);
    return set.data;
  },
  comment: async (id) => {
    await axios.get(process.env.ServerURL + "/set/comment?id=" + id);
  },
};

module.exports = main;
