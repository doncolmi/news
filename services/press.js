const axios = require("axios");


const makeString = (list) => {
    let lists;
    try{
        lists = [...list];
    } catch (e) {
        return ["das"];
    }
    for(let item of lists) {
        item = item + "";
    }
    return lists;
}

function checkFollow(list, item) {
    return list.indexOf(item);
}
const main = {
    getPressList : async (id) => {
        const press = await axios.get('http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/press');
        const followListWrapper = await axios.get('http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/fav/press?id=' + id);
        const followList = await makeString(followListWrapper.data);
        const res = [];
        for(const item of press.data) {
            const data = {
                name : item.name,
                follow : item.follow + "개",
                checkFollow : await checkFollow(followList, item.name)
            }
            res.push(data);
        }
        return res;
    },
    getPressListOrderByFollow : async (id) => {
        const press = await axios.get('http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/press/follow');
        const followListWrapper = await axios.get('http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/fav/press?id=' + id);
        const followList = await makeString(followListWrapper.data);
        const res = [];
        for(const item of press.data) {
            const data = {
                name : item.name,
                follow : item.follow + "개",
                checkFollow : await checkFollow(followList, item.name)
            }
            res.push(data);
        }
        return res;
    },
    add : async (name, uid) => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/press/add?name=" + encodeURI(name) + "&uid=" + uid;
        const press = await axios.get(url).catch(err => console.log(err));
        console.log(press);
        return press.data;
    },
    remove : async (name, uid) => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/press/remove?name=" + encodeURI(name) + "&uid=" + uid;
        await axios.get(url).catch(e => console.log(e));
    },
    getPress : async (name) => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/press/" + encodeURI(name);
        const press = await axios.get(url).catch(e => console.log(e));
        return press.data;
    }
};

module.exports = main;

// todo : plus에서 minus로 안바뀜 이에 대해 수정 바람
// todo : 플러스 마이너스 할때 사람 수 바뀌게 수정해야함 깜빡하고 안넣음.
// todo : 나머지 기능은 잘 작동하나 한번 잘해보세용