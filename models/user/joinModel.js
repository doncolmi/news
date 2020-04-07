const axios = require('axios');

const nullPut = (obj, text) => {obj = null; console.log(text + " 오류입니다.")};

class joinUser {
    constructor(id, pw, email) {
        typeof id === 'string' ? this.id = id : nullPut(this.id, 'id')
        typeof pw === 'string' ? this.pw = pw : nullPut(this.pw, 'pw')
        typeof email === 'string' ? this.email = email : nullPut(this.email, 'email')
    }

    saveUser() {
        const result = axios.post('localhost:8080/user', JSON.stringify(this), {
            headers : {
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        }).catch(err => console.log(err));
        return result.data;
    }
}

module.exports = (id, pw, email) => new joinUser(id, pw, email);