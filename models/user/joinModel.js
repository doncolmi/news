const axios = require('axios');

const nullPut = (obj, text) => {obj = null; console.log(text + " 오류입니다.")};

class joinUser {
    constructor(id, pw, email) {
        typeof id === 'string' ? this.id = id : nullPut(this.id, 'id')
        typeof pw === 'string' ? this.pw = pw : nullPut(this.pw, 'pw')
        typeof email === 'string' ? this.email = email : nullPut(this.email, 'email')
    }

    async saveUser() {
        const result = await axios({
            method: 'post',
            headers: {
                'dataType': 'json',
                'Content-type' : 'application/json; charset=utf-8',
            },
            url: 'http://localhost:8080/user',
            data: JSON.stringify(this),
        }).catch(err => console.log(err));
        return result.data;
    }
}

module.exports = (id, pw, email) => new joinUser(id, pw, email);