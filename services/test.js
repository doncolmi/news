const cron = require('node-cron');

const ax = require('axios');
const cheerio = require('cheerio');
const san = require('sanitize-html');

const getTitle = async (url) => {
    try{
        return await ax.get(url);
    } catch(error) {
        console.log(error);
    }
};

cron.schedule('*/10 * * * * *', () => {
    console.log("이거맞아 대성아");
    const url = `https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=105`;

    getTitle(url)
        .then(html => {
            console.log(html.head);
            let ulList = [];
            const $ = cheerio.load(html.data);

            const $bodyList = san($("ul.type06_headline").children("li"), {
                parser: {
                    decodeEntities: true
                }
            });
console.log($bodyList);
            // $bodyList.each(function(i, elem) {
            //     const content = $(this).find('dl dt:nth-child(2)').text().trim();
            //     ulList[i] = {
            //         title : content
            //     }
            // });
            // console.log(ulList);
        })
})

module.exports = cron;