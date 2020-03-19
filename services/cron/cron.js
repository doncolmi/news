const cron = require('node-cron');

const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function ax(url) {
    return axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'});
}

cron.schedule('*/10 * * * * *', () => {
    ax(`https://media.naver.com/channel/settings.nhn`)
        .then(htmlDoc => {
            let result = [];
            const $ = cheerio.load(htmlDoc.data);
            const pressList = $("ul.ca_list").children("li");
            pressList.each(function(i, elem) {
                const _name = $(this).find('a div.ca_name').text().trim();
                const _img = $(this).find('a div.ca_thumb img').attr("src");
                result[i] = [_name, _img];
            });
        });
    axios.get('http://localhost:8080/press/all')
        .then(res => {
            console.log(res.data[0].name);
        });


})