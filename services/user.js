const joinUser = require("../models/user/joinModel");
const encrypt = require("./util/encrypt");
const axios = require("axios");
const send = require("./util/mail");

const main = {
    join : async (data) => {
       const encPw = await encrypt.joinEncPw(data.pw);
       return await joinUser(data.id, encPw.pw, data.email, encPw.salt).saveUser();
    },
    vali : async (data, type) => {
        const res = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/user?data=' + data + "&type=" + type);
        return res.data;
    },
    login : async (data) => {
        const item = {
            "id" : data.id,
            "pw" : await encrypt.getEncPw(data.pw, await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/salt?data=' + data.id))
        };
        const result = await axios({
            method: 'post',
            headers: {
                'dataType': 'json',
                'Content-type' : 'application/json; charset=utf-8',
            },
            url: 'http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/login',
            data: JSON.stringify(item),
        }).catch((err) => {
            console.log(err);
            return 0;
        });
        return result.data;
    },
    authCheck : async (id) => {
        const res = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/auth?data=" + id)
        return res.data;
    },
    getEmail : async (id) => {
        try {
            const res = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/email?data=" + id);
            return res.data;
        } catch (e) {
            console.log(e);
            return "None";
        }
    },
    auth : async (code) => {
        const res = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/chkCode?code=" + code);
        return res.data;
    },
    resend : async (email) => {
        const code = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/code?data=" + email);
        await send.send(email, code.data);
        return true;
    },
}
module.exports = main;

module.exports.getSetting = async (id) => {
    const set = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/set?id=" + id);
    return set.data;
};

module.exports.findId = async (email) => {
    const id = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/find/id?email=" + email);
};

module.exports.findPw = async (email, id) => {
    const sends = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/find/pw?email=' + email + '&id=' + id);
    if(sends.data.length === 6) {
        const password = await encrypt.joinEncPw(sends.data);
        const data = {
            pw : password.pw,
            salt : password.salt,
            email : email,
        }
        const result = await axios({
            method: 'post',
            headers: {
                'dataType': 'json',
                'Content-type' : 'application/json; charset=utf-8',
            },
            url: 'http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/find/pw',
            data: JSON.stringify(data),
        }).catch((err) => {
            console.log(err);
            return 0;
        });

        if(result.data) {
            await send.authSend(email, sends.data);
            console.log("보냈다!");
        } else {
            console.log(sends.data);
            throw new Error("result 에러");
        }
    } else {
        throw new Error("sends 에러");
    }
};

module.exports.getFollowPress = async (id) => {
    const res = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/follow/press?id=" + id);
    console.log(res.data);
    return res.data
}

module.exports.getFollowTopic = async (id) => {
    const res = await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/follow/topic?id=" + id);
    return res.data
}

module.exports.getUserInfo = async (id) => {
    const res = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/user/info?id=' + id);
    return res.data;
}

module.exports.authPw = async (id, pw) => {
    const salt = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/salt?data=' + id);
    const password = await encrypt.getEncPw(pw, salt);
    const result = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/user/auth?id=' + id +'&pw=' + password);
    return result.data;
}

module.exports.chgPwInMyPage = async (id, pw) => {
    const password = await encrypt.joinEncPw(pw);
    const data = {
        pw : password.pw,
        salt : password.salt,
        id : id
    }
    const result = await axios({
        method: 'post',
        headers: {
            'dataType': 'json',
            'Content-type' : 'application/json; charset=utf-8',
        },
        url: 'http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/user/info',
        data: JSON.stringify(data),
    }).catch((err) => {
        console.log(err);
        return false;
    });

    return result.data;
}

module.exports.byeUser = async (id) => {
    await axios.get("http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/bye?id=" + id);
}