const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const newsModel = require('../../models/newsModel');
const updatePress = require('./press');

const log = console.log;
const topic = [{
    id: 1,
    url : "100",
    name : "정치"
},{
    id: 2,
    url : "101",
    name : "경제"
},{
    id: 3,
    url : "102",
    name : "사회"
},{
    id: 4,
    url : "103",
    name : "생활/문화"
},{
    id: 5,
    url : "105",
    name : "IT/과학"
},{
    id: 6,
    url : "110",
    name : "오피니언"
}];

// const replaceText = [
//     "<!-- 본문 내용 -->","<!-- TV플레이어 -->","<!-- // TV플레이어 -->",
//     `<script type='text/javascript"`, `// flash 오류를 우회하기 위한 함수 추가`,
//     `function _flash_removeCallback() {}`, `</script`, `>>`
// ];
//
// const replaceBlank = (content, text) => {
//     return content.replace(text, "");
// }
// const replaceContent = (content) => {
//     let result = content;
//     const spliceNum = result.indexOf('<span');
//     if(spliceNum !== -1) {
//         result.splice(0, spliceNum);
//     }
//     for(const item of replaceText) {
//         result = replaceBlank(result, item);
//     }
//     return result;
// }

const ax = (url) => (axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'}));

const updateNews = async () => {
    for(const item of topic) {
        await ax(`https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=${item.url}&listType=title`)
            .then(async htmlDoc => {
                let ress = []; let html = iconv.decode(htmlDoc.data, 'EUC-KR');
                const $ = cheerio.load(html);
                const list = $("ul.type02").children("li");

                let pressList = [];

                await list.each(function(i, elem) {
                    ress[i] = {
                        title : $(this).find("a").text().trim(),
                        href : $(this).find("a").attr("href"),
                        press : $(this).find("span.writing").text().trim(),
                        topic : item.name
                    }
                    pressList.push(ress[i].press);
                });

                await updatePress(new Set([...pressList])).catch(err => console.log(err));
                const update = await checkNews(ress);
                await saveNews(update, item.id).catch(err => console.log(err));
            });
    }
}

const checkNews = async (list) => {
    let i = 0;
    for(;i < list.length; i++) {
        const chk = await checkTitle(list[i].title);
        if(chk > 0) break;
    }
    return [...list].slice(0,++i);
}

const checkTitle = async (title) => {
    let result;
    await axios.get('http://localhost:8080/news?title=' + encodeURI(title))
        .then(res => {
            result = res.data;
        });
    return result;
}

const getContents = async  (url) => {
    const res = [];
    await ax(url)
        .then(htmlDoc => {
            let html = iconv.decode(htmlDoc.data, 'EUC-KR');
            const $ = cheerio.load(html);
            let col = $("div#main_content");
            let content = col.find("div.articleBodyContents").text();
            if(content) {
                content = col.find("div.news_end").text();
            }
            if(content) {
                content = col.find("div._article_body_contents").text();
            }
            res.push(content);
            res.push(col.find('div.sponsor span.t11:nth-child(1)').text().trim());
        });
    return res;
}

const saveNews = async (news, topic) => {
    for(const elem of news) {
        const contents = await getContents(elem.href);

        const data = {
            press : elem.press,
            topic : topic,
            title : elem.title,
            contents : contents[0],
            news_dt : contents[1],
            href : elem.href,
        };

        await newsModel(data).saveNews();
    }
}
module.exports = updateNews;