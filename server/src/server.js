const https = require('https')
const fs = require('fs')

const app = require('./app');

const PORT = process.env.PORT || 80;

const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');

const server = https.createServer({ key, cert },app);

async function startServer() {
    
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
};

startServer();