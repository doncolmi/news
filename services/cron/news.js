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
    name : "생활"
},{
    id: 5,
    url : "105",
    name : "IT"
},{
    id: 6,
    url : "110",
    name : "오피니언"
}];

const replaceText = [
    "<!-- 본문 내용 -->","<!-- TV플레이어 -->","<!-- // TV플레이어 -->",
    `<script type="text/javascript">`, `// flash 오류를 우회하기 위한 함수 추가`,
    `function _flash_removeCallback() {}`, `</script>`, "<!-- // 본문 내용 -->"
];

const replaceBlank = (content, text) => {
    return content.replace(text, "");
}
const replaceContent = (content) => {
    let result = content;
    if(result) {
        for(const item of replaceText) {
            result = replaceBlank(result, item);
        }
    } else { log("얘 Null인데요?"); }
    return result;
}

const headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4097.0 Safari/537.36'
};

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
                if(!(update.length < 1)) {
                    await saveNews(update, item.id).catch(err => console.log(err));
                }
            });
    }
}

const checkNews = async (list) => {
    let i = 0;
    for(;i < list.length; i++) {
        const chk = await cntHref(list[i].href);
        if(chk > 0) break;
    }
    log("checkNews의 i값은 : " + i);
    if(i === 0) { return [...list].slice(0,i)};
    return [...list].slice(0,++i);
}

const cntHref = async (href) => {
    const res = await axios.get('http://ec2-15-165-158-209.ap-northeast-2.compute.amazonaws.com:18502/news/chk?href=' + href.replace(/&/g,"%26"));
    return res.data;
}

const getContents = async  (url) => {
    const res = [];
    await ax(url)
        .then(htmlDoc => {
            let html = iconv.decode(htmlDoc.data, 'EUC-KR');
            const $ = cheerio.load(html);
            let col = $("div#main_content");

            let content = col.find("div#articleBodyContents").html();
            if(content === null || content === undefined) {content = col.find("div#newsEndContents").html();};
            let date = col.find('div.sponsor span.t11:nth-child(1)').text().trim();
            if(date === null || date === undefined) {date = col.find('div.sponsor span.t11').text().trim()};

            res.push(replaceContent(content));
            res.push(date);
        });
    return res;
}

const saveNews = async (news, topic) => {
    for(const elem of news) {
        const contents = await getContents(elem.href);
        await newsModel(elem.press, topic, elem.title, contents[0], contents[1], elem.href).saveNews();
    }
}
module.exports = updateNews;