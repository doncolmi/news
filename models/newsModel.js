const axios = require('axios');
const press = require('./pressModel');

class News {
    constructor(news) {
        this.press = news.press;
        this.topic = news.topic;
        this.title = news.title;
        this.contents = news.contents;
        this.news_dt = news.news_dt;
        this.href = news.href;
    }

    saveNews() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/news',
            data: this,
            headers: {
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        });
    }
}

module.exports = news => new News(news);