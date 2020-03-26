const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const news = require('../../models/newsModel');

const log = console.log;


const ax = (url) => (axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'}));

const updateNews = async () => {
    console.time('for');
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
    }
    ]


    topic.forEach( item => {
        ax(`https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&sid1=${item.url}&listType=title`)
            .then(async htmlDoc => {
                let ress = [];
                let html = iconv.decode(htmlDoc.data, 'EUC-KR');
                const $ = cheerio.load(html);
                const list = $("ul.type02").children("li");
                await list.each(function(i, elem) {
                    ress[i] = {
                        title : $(this).find("a").text().trim(),
                        href : $(this).find("a").attr("href"),
                        press : $(this).find("span.writing").text().trim(),
                        topic : item.name
                    }
                });
                const update = await checkNews(ress);
                for(const elem of update) {
                    const contents = await getContents(elem.href);
                    const data = {
                        press : elem.press,
                        topic : item.id,
                        title : elem.title,
                        contents : contents[0],
                        news_dt : contents[1],
                        img : contents[2],
                        href : elem.href,
                    };
                    await news(data).saveNews();
                }
            });
    });
    console.timeEnd('for');
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
            html = html.replace(`<span class=\"end_photo_org\">`, `HereImageDaeSeong<span class=\"end_photo_org\">`);
            const $ = cheerio.load(html);
            let col = $("div#main_content");
            let img = $("span.end_photo_org").children("img").toArray();
            let imgs = getImgs(img);

            res.push(col.find("div#articleBodyContents").text().trim());
            res.push(col.find('div.sponsor span.t11:nth-child(1)').text().trim());
            res.push(imgs);
        });
    return res;
}

const getImgs = (array) => {
    let result = "";
    for(let i = 0; i < array.length; i++) {
        result += "," + array[i].attribs.src;
    }
    return result.slice(1);
}

module.exports = updateNews;