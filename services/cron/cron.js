const cron = require('node-cron');
const updateNews = require('./news');

const statusChk = require('./statusChk');

cron.schedule('0 */5 * * * *', async () => {
    if(await statusChk()) { await updateNews(); }
});