const cron = require('node-cron');
const updateNews = require('./news');
const updateNewsEng = require('./newsEng');

const statusChk = require('./statusChk');

cron.schedule('0 * * * * *', async () => {
    if(await statusChk()) { await updateNews(); }
});