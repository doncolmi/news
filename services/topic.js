const axios = require("axios");

const topic = {
    getTopic : async (name) => {
        const url = "http://localhost:8080/topic/" + encodeURI(name);
        const topic = await axios.get(url).catch(e => console.log(e));
        return topic.data;
    },
    getTopicFollow : async () => {
        const url = "http://localhost:8080/topic";
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
        const url = "http://localhost:8080/topic/follow?id=" + id;
        try{
            const topic = await axios.get(url).catch(e => console.log(e));
            return topic.data;
        } catch (e) {
            console.log(e);
            return [0,0,0,0,0,0];
        }
    },
    add : async (name, uid) => {
        const url = "http://localhost:8080/topic/add?name=" + encodeURI(name) + "&uid=" + uid;
        const topic = await axios.get(url).catch(err => console.log(err));
        return topic.data;
    },
    remove : async (name, uid) => {
        const url = "http://localhost:8080/topic/remove?name=" + encodeURI(name) + "&uid=" + uid;
        await axios.get(url).catch(e => console.log(e));
    },
}

module.exports = topic;