const axios = require('axios');
const cheerio = require('cheerio');

const ax = (url) => (axios.get(url, {responseEncoding : 'binary', responseType : 'arraybuffer'}));

const updatePress = async () => {
    let result = [];
    let update;

    // Get Press in Naver News
    await ax(`https://media.naver.com/channel/settings.nhn`)
        .then(htmlDoc => {
            const $ = cheerio.load(htmlDoc.data);
            const pressList = $("ul.ca_list").children("li");
            pressList.each(function(i, elem) {
                const _name = $(this).find('a div.ca_name').text().trim();
                const _img = $(this).find('a div.ca_thumb img').attr("src");
                result[i] = [_name, _img];
            });
        });

    // Create a list to add compared to existing press
    await axios.get('http://localhost:8080/press/all')
        .then(res => {
            const name = [];

            for(let i = 0; i < res.data.length; i++) {
                name.push(res.data[i].name);
            }
            update = result.filter(item => name.indexOf(item[0]) === -1);
        });
    // If the [update] is greater than zero,
    // the data in the [update] is sent to POST.

    if(update.length > 0) {
        console.log("실행!");
        axios({
            method: 'post',
            url: 'http://localhost:8080/press',
            data: update,
            headers: {
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            }
        })
    }
}

module.exports = updatePress;