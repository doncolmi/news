const cron = require('node-cron');
const updatePress = require('./press');
const updateNews = require('./news');

const statusChk = require('./statusChk');

cron.schedule('0 0 0 * * *', async () => {
    if(await statusChk()) { await updatePress(); }
});

cron.schedule('0 * * * * *', async () => {
    if(await statusChk()) { await updateNews(); }
});