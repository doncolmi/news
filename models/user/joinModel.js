const axios = require('axios');
const email = require('../../services/util/mail');

const nullPut = (obj, text) => {obj = null; console.log(text + " 오류입니다.")};

class joinUser {
    constructor(id, pw, email, salt) {
        typeof id === 'string' ? this.id = id : nullPut(this.id, 'id')
        typeof pw === 'string' ? this.pw = pw : nullPut(this.pw, 'pw')
        typeof email === 'string' ? this.email = email : nullPut(this.email, 'email')
        typeof salt === 'string' ? this.salt = salt : nullPut(this.salt, 'salt');
    }

    async saveUser() {
        let result;
        await axios({
            method: 'post',
            headers: {
                'dataType': 'json',
                'Content-type' : 'application/json; charset=utf-8',
            },
            url: 'http://ec2-13-125-237-51.ap-northeast-2.compute.amazonaws.com:15688/user',
            data: JSON.stringify(this),
        })
            .then(async (res) => {
                const code = await axios.get('http://ec2-13-125-237-51.ap-northeast-2.compute.amazonaws.com:15688/code?data=' + this.id);
                try{
                    await email.send(this.email, code.data);
                } catch (e) {
                    console.log(e);
                    console.log("이메일 발송 실패");
                };
                console.log(res);
                result = await res.data;
            })
            .catch(err => console.log(err));

        return result;
    }
}

module.exports = (id, pw, email, salt) => new joinUser(id, pw, email, salt);