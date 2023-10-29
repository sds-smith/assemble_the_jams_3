const express = require('express');

async function httpResponseTemplate(req, res) {
    const response = 'Connected to Server';
    return res.status(200).json(response);
};

const api = express.Router();

api.use('/', httpResponseTemplate);

module.exports = api;