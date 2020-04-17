const axios = require('axios');
const newsModel = require('../models/newsModel');
const cheerio = require('cheerio');

const main = {
    getNews : async (id) => {
        console.log("id값은 : " + id);
        const news = await axios.get('http://localhost:8080/news/' + id);
        const res = newsModel(news.data);
        console.log(res);
        return res;
    },
    getNewsList : async (page) => {
        const news = await axios.get('http://localhost:8080/news?page=' + (page * 1));
        let i = 0;
        const res = [];
        for(const item of news.data) {
            const $ = await cheerio.load(item.contents);
            let img = await $("img").attr("src");
            if(!img) {
                img = '/img/news.png';
            }
            const data = {
                title : item.title,
                date : `${item.createdDate[3]}시 ${item.createdDate[4]}분`,
                name : item.press.name,
                img : img
            }
            console.log(data);
            res.push(data);
        }
        return res;
    }
}

module.exports = main;