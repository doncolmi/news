const axios = require("axios");

const topic = {
    getTopic : async (name) => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/topic/" + encodeURI(name);
        const topic = await axios.get(url).catch(e => console.log(e));
        return topic.data;
    },
    getTopicFollow : async () => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/topic";
        try{
            const topic = await axios.get(url).catch(e => console.log(e));
            const res = [];
            for(const item of topic.data) {
                res.push(item.follow);
            }
            return res;
        } catch (e) {
            console.log(e);
            return [0,0,0,0,0,0];
        }
    },
    getTopicFollowMe : async (id) => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/topic/follow?id=" + id;
        try{
            const topic = await axios.get(url).catch(e => console.log(e));
            return topic.data;
        } catch (e) {
            console.log(e);
            return [0,0,0,0,0,0];
        }
    },
    add : async (name, uid) => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/topic/add?name=" + encodeURI(name) + "&uid=" + uid;
        const topic = await axios.get(url).catch(err => console.log(err));
        return topic.data;
    },
    remove : async (name, uid) => {
        const url = "http://ec2-13-209-19-217.ap-northeast-2.compute.amazonaws.com:15688/topic/remove?name=" + encodeURI(name) + "&uid=" + uid;
        await axios.get(url).catch(e => console.log(e));
    },
}

module.exports = topic;