const cron = require('node-cron');
const updateNews = require('./news');

const statusChk = require('./statusChk');

cron.schedule('0 * * * * *', async () => {
    if(await statusChk()) { await updateNews(); }
});

// todo : 기사가 중복으로 받아져온다. 수정할수있도록 해라 미래의 나 