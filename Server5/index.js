require('dotenv').config();
const express = require('express');
const app = express();
const oauth = require('./oauth');
const webhook = require('./webhook');

app.use(express.json());
app.get('/callback', oauth.handleCallback);
app.post('/webhook', webhook.handleWebhook);

app.listen(9995, () => console.log('🚀 Bot running on http://localhost:3000'));
