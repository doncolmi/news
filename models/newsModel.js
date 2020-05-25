const axios = require('axios');
const press = require('./pressModel');

class News {
    constructor(press, topic, title, contents, news_dt, href) {
        typeof press === "string" ? this.press = press : console.log("press 오류");
        typeof topic === "number" ? this.topic = topic : console.log("topic 오류");
        typeof title === "string" ? this.title = title : console.log("title 오류");
        typeof contents === "string" ? this.contents = contents : console.log("contents 오류");
        typeof news_dt === "string" ? this.news_dt = news_dt : console.log("news_dt 오류");
        typeof href === "string" ? this.href = href : console.log("href 오류");
    }

    saveNews() {
        axios({
            method: 'post',
            url: 'http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/news',
            data: this,
            headers: {
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        });
    }
}

module.exports = (press, topic, title, contents, news_dt, href) => new News(press, topic, title, contents, news_dt, href);