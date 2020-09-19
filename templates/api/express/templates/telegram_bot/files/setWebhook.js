const fs = require('fs');
const axios = require('axios');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const CERTIFICATE_FILENAME = process.env.CERTIFICATE_FILENAME;

async function main () {
    const result = await axios({
        method: 'POST',
        url: `https://api.telegram.org/bot${TOKEN}/setWebhook`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            url: WEBHOOK_URL,
            certificate: fs.readFileSync(CERTIFICATE_FILENAME, {encoding: 'utf8'}),
        },
    });
    console.log('result.data =', result.data);
}

main().catch(error => console.error(error));
