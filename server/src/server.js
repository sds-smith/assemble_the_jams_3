import https from 'https';
import fs from 'fs';
import app from './app.js';

const PORT = process.env.PORT || 80;

const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');

const server = https.createServer({ key, cert }, app);

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
        console.log(`GraphQL endpoint: https://localhost:${PORT}/graphql`);
    });
};

startServer();