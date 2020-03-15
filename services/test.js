const cron = require('node-cron');

const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function ax(url) {
    return axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'});
}

cron.schedule('*/10 * * * * *', () => {
    console.log("이거맞아 대성아");
    const url = `https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=105`;

    ax(url)
        .then(htmlDoc => {
           let html = iconv.decode(htmlDoc.data, 'EUC-KR');
            let result = [];
            const $ = cheerio.load(html);
            let col = $("ul.type06_headline").children("li");
            col.each(function(i, elem) {
                result[i] = $(this).find('dl dt:nth-child(2)').text().trim();
                if(result[i] === '') {
                    result[i] = $(this).find('dl dt:nth-child(1)').text().trim();
                }
            });
            console.log(result);
        })
})

module.exports = cron;