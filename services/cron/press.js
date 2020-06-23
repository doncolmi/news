const axios = require("axios");

const headers = {
  "Content-type": "application/json",
};

const updatePress = async (items) => {
  const getPress = await axios.get(process.env.ServerURL + "/press");

  let pressNames = [];
  for (let i = 0; i < getPress.data.length; i++) {
    pressNames.push(getPress.data[i].name);
  }

  for (const item of items) {
    const index = pressNames.indexOf(item);
    if (index === -1) {
      axios
        .post(
          process.env.ServerURL + "/press",
          JSON.stringify({ name: item }),
          { headers }
        )
        .catch((err) => console.log(err));
    }
  }
};

module.exports = updatePress;
