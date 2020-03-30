const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8000;

http.createServer(app)
    .listen(port, () => {
        console.log(`Your Server is Running on Port ${port}`);
    });