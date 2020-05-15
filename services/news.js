const axios = require('axios');
const newsModel = require('../models/newsModel');
const cheerio = require('cheerio');

module.exports.getNewsList = async function(page) {
    const news = await axios.get('http://localhost:8080/news?page=' + (page * 1));
    const res = [];
    for(const item of news.data) {
        const $ = await cheerio.load(item.contents);
        let img = await $("img").attr("src");
        let text = await $.text();
        if(!img) img = '/img/news.png';
        !text ? text = "본문이 사진으로 이루어져있거나 내용이 없는 기사입니다."
            : text = text.substr(0,200) + "...";

        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            title : item.title,
            date : makeTime(time),
            name : item.press.name,
            img : img,
            text : text
        }
        res.push(data);
    }
    return res;
};

module.exports.getNewsRecent = async function() {
    const news = await axios.get('http://localhost:8080/news/recent');
    const res = [];
    for(const item of news.data) {
        const $ = await cheerio.load(item.contents);
        let img = await $("img").attr("src");
        if(!img) img = '/img/news.png';
        const data = {
            id : item.id,
            title : item.title,
            img : img
        }
        res.push(data);
    }
    return res;
};

module.exports.cntNews = async function() {
    const count = await axios.get('http://localhost:8080/news/cnt');
    return count.data;
};

module.exports.getPressNews = async function(name, page) {
    const news = await axios.get('http://localhost:8080/press/' + encodeURI(name) + '/news?page=' + page);
    const res = [];
    for(const item of news.data) {
        const $ = await cheerio.load(item.contents);
        let img = await $("img").attr("src");
        let text = await $.text();
        if(!img) img = '/img/news.png';
        !text ? text = "본문이 사진으로 이루어져있거나 내용이 없는 기사입니다."
            : text = text.substr(0,200) + "...";

        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            title : item.title,
            date : makeTime(time),
            name : item.press.name,
            img : img,
            text : text
        }
        res.push(data);
    }
    return res;
};

module.exports.cntPressNews = async function(name) {
    const cnt = await axios.get('http://localhost:8080/press/' + encodeURI(name) + '/cnt').catch(err => console.log(err));
    return cnt.data;
};

module.exports.getTopicNews = async function(name, page)  {
    const news = await axios.get('http://localhost:8080/topic/' + encodeURI(name) + '/news?page=' + page);
    const res = [];
    for(const item of news.data) {
        const $ = await cheerio.load(item.contents);
        let img = await $("img").attr("src");
        let text = await $.text();
        if(!img) img = '/img/news.png';
        !text ? text = "본문이 사진으로 이루어져있거나 내용이 없는 기사입니다."
            : text = text.substr(0,200) + "...";

        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            title : item.title,
            date : makeTime(time),
            name : item.press.name,
            img : img,
            text : text
        }
        res.push(data);
    }
    return res;
};

module.exports.cntTopicNews = async function(name)  {
    const cnt = await axios.get('http://localhost:8080/topic/' + encodeURI(name) + '/cnt').catch(err => console.log(err));
    return cnt.data;
};

module.exports.getMyNewsByPress = async function(id, page)  {
    const news = await axios.get('http://localhost:8080/main/press?id=' + id + '&page=' + page);
    const res = [];
    for(const item of news.data) {
        const $ = await cheerio.load(item.contents);
        let img = await $("img").attr("src");
        let text = await $.text();
        if(!img) img = '/img/news.png';
        !text ? text = "본문이 사진으로 이루어져있거나 내용이 없는 기사입니다."
            : text = text.substr(0,200) + "...";

        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            title : item.title,
            date : makeTime(time),
            name : item.press.name,
            img : img,
            text : text
        }
        res.push(data);
    }
    return res;
};

module.exports.getMyNewsTopic = async function(id, page)  {
    const news = await axios.get('http://localhost:8080/main/topic?id=' + id + '&page=' + page);
    const res = [];
    for(const item of news.data) {
        const $ = await cheerio.load(item.contents);
        let img = await $("img").attr("src");
        let text = await $.text();
        if(!img) img = '/img/news.png';
        !text ? text = "본문이 사진으로 이루어져있거나 내용이 없는 기사입니다."
            : text = text.substr(0,200) + "...";

        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            title : item.title,
            date : makeTime(time),
            name : item.topic.name,
            img : img,
            text : text
        }
        res.push(data);
    }
    return res;
};

module.exports.getNewsLe = async function(id, uId)  {
    const newsWrapper = await axios.get("http://localhost:8080/news/" + id);
    const news = newsWrapper.data;
    const $ = await cheerio.load(news.contents);
    const minus = $('div.vod_area').html();
    if(minus) {
        news.contents = news.contents.replace(minus, `<a class="viedoLink" target="_blank" href="${news.href}">해당 기사는 동영상 뉴스입니다.<br>동영상은 해당 링크에서 시청하실 수 있습니다. </a>`);
    }
    news.contents = news.contents.slice(0,(news.contents.indexOf('<a href') - 4));
    news.contents = news.contents.slice(0,(news.contents.indexOf('<a target') - 4));

    if(news.createdDate[4] == 0) {
        news.createdDate[4] = '00';
    }
    const time = `${news.createdDate[0]}-${news.createdDate[1]}-${news.createdDate[2]} ${news.createdDate[3]}:${news.createdDate[4]}`;
    const data = {
        id: news.id,
        title: news.title,
        date : time,
        press : news.press.name,
        contents : news.contents,
        topic : news.topic.name,
        href : news.href,
        save : await checkSave(uId, news.id)
    }
    return data;
};


async function checkSave(uId, nId) {
    const res = await axios.get(`http://localhost:8080/news/save/chk?uId=${uId}&nId=${nId}`);
    return res.data;
}

module.exports.getNewsReply = async (id) => {
    const reply = await axios.get("http://localhost:8080/news/"+ id + "/reply"  + "?page=0");
    const res = [];
    for(const item of reply.data) {
        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            name : item.user.uid,
            date : makeTime(time),
            contents : item.contents,
        }
        res.push(data);
    }
    return res;
}

module.exports.getNewsReplyCnt = async (id) => {
    const reply = await axios.get("http://localhost:8080/news/"+ id + "/reply/cnt");
    console.log(reply.data);
    return reply.data;
}

module.exports.saveNewsReply = async (newsId, userId, contents) => {
    const data = {
        "userId" : userId,
        "contents" : contents
    };
    await axios({
        method: 'post',
        headers: {
            'dataType': 'json',
            'Content-type' : 'application/json; charset=utf-8',
        },
        url: 'http://localhost:8080/news/' + newsId + '/reply',
        data: data,
    }).catch(err => console.log(err));
}

module.exports.getReplyContents = async (id) => {
    const contents = await axios.get('http://localhost:8080/news/reply/' + id);
    return contents.data;
}

module.exports.updateReplyContents = async (id, contents) => {
    const data = {
        contents : contents,
    }
    await axios({
        method: 'patch',
        headers: {
            'dataType': 'json',
            'Content-type' : 'application/json; charset=utf-8',
        },
        url: 'http://localhost:8080/news/reply/' + id,
        data: JSON.stringify(data),
    }).catch(err => console.log(err));
    const reply = await axios.get('http://localhost:8080/news/reply/' + id);
    return reply.data;
}

module.exports.deleteReply = async (id) => {
    await axios.delete('http://localhost:8080/news/reply/' + id);
}

module.exports.getAddReply = async (id, page) => {
    const reply = await axios.get("http://localhost:8080/news/"+ id + "/reply"  + "?page=" + page);
    const res = [];
    for(const item of reply.data) {
        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            name : item.user.uid,
            date : makeTime(time),
            contents : item.contents,
        }
        res.push(data);
    }
    return res;
}

module.exports.saveNews = async (uId, nId) => {
    const data = {
        userId : uId,
        newsId : nId * 1
    }
    const saveNews = await axios({
        method: 'post',
        headers: {
            'dataType': 'json',
            'Content-type' : 'application/json; charset=utf-8',
        },
        url: 'http://localhost:8080/news/save',
        data: data,
    }).catch(err => console.log(err));
    return saveNews.data;
}

module.exports.deleteNews = async (id) => {
    const del = await axios.delete('http://localhost:8080/news/save/' + id);
    return del.data;
}

module.exports.cntSaveNews = async (id) => {
    const cnt = await axios.get('http://localhost:8080/news/save/cnt?id=' + id);
    return cnt.data;
}

module.exports.getSaveNews = async (id, page) => {
    const news = await axios.get('http://localhost:8080/news/save/get?page=' + page + '&id=' + id)
        .catch(err => console.log(err));
    const res = [];
    for(const item of news.data) {
        const $ = await cheerio.load(item.contents);
        let img = await $("img").attr("src");
        let text = await $.text();
        if(!img) img = '/img/news.png';
        !text ? text = "본문이 사진으로 이루어져있거나 내용이 없는 기사입니다."
            : text = text.substr(0,200) + "...";

        if(!(item.createdDate[5])) item.createdDate[5] = '00';
        if((item.createdDate[1] * 1) < 10) {
            item.createdDate[1] = '0' + item.createdDate[1];
        }
        const time = `${item.createdDate[0]}-${item.createdDate[1]}-${item.createdDate[2]}T${item.createdDate[3]}:${item.createdDate[4]}:${item.createdDate[5]}`;
        const data = {
            id : item.id,
            title : item.title,
            date : makeTime(time),
            name : item.press.name,
            img : img,
            text : text
        }
        res.push(data);
    }
    return res;
}

function makeTime(time) {
    let date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," "))
    let diff = (new Date().getTime() - date.getTime()) / 1000;
    if(diff < 0) diff = 0;
    let day_diff = Math.floor(diff / 86400);
    if ( isNaN(day_diff) || day_diff < 0 ) return;

    return day_diff == 0 && (
        diff < 60 && "방금전" ||
        diff < 120 && "1분전" ||
        diff < 3600 && Math.floor( diff / 60 ) + " 분전" ||
        diff < 7200 && "1시간전" ||
        diff < 86400 && Math.floor( diff / 3600 ) + " 시간전") ||
        day_diff == 1 && "어제" ||
        day_diff < 7 && day_diff + " 일전" ||
        day_diff < 31 && Math.floor( day_diff / 7 ) + " 주전" ||
        day_diff < 360 && Math.floor( day_diff / 30 ) + " 개월 전" ||
        day_diff >= 360 && (Math.floor( day_diff / 360 )==0?1:Math.floor( day_diff / 360 )) + " 년 전"
}
