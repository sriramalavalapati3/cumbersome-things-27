require('dotenv').config();
const { createClient } = require('redis');
const client = createClient({
    password: process.env.redish_password,
    socket: {
        host: process.env.redish_host,
        port: 18321
    }
});

module.exports={client}