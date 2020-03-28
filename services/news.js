const axios = require('axios');
const newsModel = require('../models/newsModel');

const main = {
    getNews : async (id) => {
        console.log("id값은 : " + id);
        const news = await axios.get('http://localhost:8080/news/' + id);
        const res = newsModel(news.data);
        console.log(res);
        return res;
    }
}

module.exports = main;