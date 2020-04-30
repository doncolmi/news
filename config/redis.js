const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const redisClient = redis.createClient({
    host: "192.168.154.128",
    port: 6379,
    auth_pass : "mypass"
});

const config = {
    "host" : "192.168.154.128",
    "port" : 6379,
    "prefix" : "sid:",
    "db" : 0,
    "client" : redisClient,
};

const redisServer = session({
    store : new redisStore(config),
    secret : 'wifi',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 5
    }
});

module.exports = redisServer;