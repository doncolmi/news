const cron = require('node-cron');

const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function ax(url) {
    return axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'});
}

// cron.schedule('*/10 * * * * *', () => {
//     console.log("이거맞아 대성아");
//     const url = `https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=105`;
//
//     ax(url)
//         .then(htmlDoc => {
//            let html = iconv.decode(htmlDoc.data, 'EUC-KR');
//             let result = [];
//             const $ = cheerio.load(html);
//             let col = $("ul.type06_headline, ul.type06").children("li");
//             col.each(function(i, elem) {
//                 let _title = $(this).find('dl dt:nth-child(2)').text().trim();
//                 if (_title === '') {
//                     _title = $(this).find('dl dt:nth-child(1)').text().trim();
//                 };
//                 result[i] = {
//                     title : _title,
//                     press : $(this).find('dl dd span.writing').text().trim(),
//                 };
//             });
//             console.log(result);
//         })
// })

const getImgs = (array) => {
    let result = [];
    for(let i = 0; i < array.length; i++) {
        result.push(array[i].attribs.src);
    }
    return result;
}

cron.schedule('*/10 * * * * *', () => {
    console.log("이거맞아 대성아");
    const url = `https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=105&oid=008&aid=0004376635`;

    ax(url)
        .then(htmlDoc => {
           let html = iconv.decode(htmlDoc.data, 'EUC-KR');
            html = html.replace(`<span class=\"end_photo_org\">`, `HereImageDaeSeong<span class=\"end_photo_org\">`);
            const $ = cheerio.load(html);
            console.log(html.toString());
            let col = $("div#main_content");
            let img = $("span.end_photo_org").children("img").toArray();
            let imgs = getImgs(img);

            const result = {
                title : col.find('h3#articleTitle').text().trim(),
                date : col.find('div.sponsor span.t11').text().trim(),
                content : col.find("div#articleBodyContents").text(),
                img : imgs,
            };
            console.log(result);
        })
})

module.exports = cron;