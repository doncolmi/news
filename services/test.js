const cron = require('node-cron');

const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');


cron.schedule('*/10 * * * * *', () => {
    console.log("이거맞아 대성아");
    const url = `https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=105`;

    request({url : url, encoding : null}, function (error, response, body) {
        let htmlDoc = iconv.decode(body, 'MS949');
        let result = [];
        const $ = cheerio.load(htmlDoc);
        let col = $("ul.type06_headline").children("li");
        col.each(function(i, elem) {
            result[i] = $(this).find('dl dt:nth-child(2)').text().trim();
        });
        console.log(result);
    });
})

module.exports = cron;