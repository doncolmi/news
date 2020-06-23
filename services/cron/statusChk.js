const axios = require("axios");

const statusChk = async function () {
  let res = true;
  await axios.get(process.env.ServerURL + "/status").catch((err) => {
    res = false;
  });
  console.log(res);
  return res;
};

module.exports = statusChk;
