const cron = require('node-cron');
const updatePress = require('./press');
const updateNews = require('./news');

cron.schedule('0 0 0 * * *', () => {
    updatePress();
});

cron.schedule('0 * * * * *', () => {
    updateNews();
});