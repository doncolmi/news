const axios = require('axios');

const headers = {
    'Content-type': 'application/json'
};

const updatePress = async (items) => {
    const getPress = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/press');

    let pressNames = [];
    for(let i = 0; i < getPress.data.length; i++) {
        pressNames.push(getPress.data[i].name);
    }

    for(const item of items){
        const index = pressNames.indexOf(item);
        if(index === -1) {
            axios.post("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/press",
                JSON.stringify({"name" : item}),
                {headers}).catch(err => console.log(err));
        }
    }
}

module.exports = updatePress;