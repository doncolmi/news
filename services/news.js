const axios = require('axios');
const newsModel = require('../models/newsModel');
const cheerio = require('cheerio');

const main = {
    getNewsList : async (page) => {
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
                title : item.title,
                date : makeTime(time),
                name : item.press.name,
                img : img,
                text : text
            }
            res.push(data);
        }
        return res;
    },
    getNewsRecent : async () => {
        const news = await axios.get('http://localhost:8080/news/recent');
        const res = [];
        for(const item of news.data) {
            const $ = await cheerio.load(item.contents);
            let img = await $("img").attr("src");
            if(!img) img = '/img/news.png';
            const data = {
                title : item.title,
                img : img
            }
            res.push(data);
        }
        return res;
    },
    cntNews : async () => {
        const count = await axios.get('http://localhost:8080/news/cnt');
        return count.data;
    },
    getPressNews : async (name, page) => {
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
                title : item.title,
                date : makeTime(time),
                name : item.press.name,
                img : img,
                text : text
            }
            res.push(data);
        }
        return res;
    },
    cntPressNews : async (name) => {
        const cnt = await axios.get('http://localhost:8080/press/' + encodeURI(name) + '/cnt').catch(err => console.log(err));
        return cnt.data;
    },
    getTopicNews : async (name, page) => {
        const news = await axios.get('http://localhost:8080/topic/' + encodeURI(name) + '/news?page=' + page);
        const res = [];
        console.log(news.data[0]);
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
                title : item.title,
                date : makeTime(time),
                name : item.press.name,
                img : img,
                text : text
            }
            res.push(data);
        }
        return res;
    },
    cntTopicNews : async (name) => {
        const cnt = await axios.get('http://localhost:8080/topic/' + encodeURI(name) + '/cnt').catch(err => console.log(err));
        return cnt.data;
    },
    getMyNewsByPress : async (id, page) => {
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

module.exports = main;