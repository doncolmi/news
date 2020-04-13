const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const config = {
    "host" : "localhost",
    "port" : 6379,
    "prefix" : "sid:",
    "db" : 0,
    "client" : redis.createClient(6379, 'localhost')
};

const redisServer = session({
    store : new redisStore(config),
    secret : 'wifi',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60
    }
});

module.exports = redisServer;