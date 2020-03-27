const axios = require('axios');
const press = require('./pressModel');

class News {
    constructor(news) {
        console.log(news.press);
        this.press = press(news.press);
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

// todo : 스트레스 받음.
// todo : 그냥 이게 빡치는게 지금 구조를 다시 짜야ㅕ 할거같음...그냥
// todo : press 부분을 아예 기사 가져올 때에 추가될 수 있게 해야할 듯함.
// todo : 일단 기사 가져올때 언론사 img파일 포기하고 제목에서 긁어올 때 언론사를 추가하게 해야할 듯 합니다.
// todo : 하 개빡친다...지금 상황은 그냥 처음부터 다시 짜야 할거같음.