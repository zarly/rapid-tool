const axios = require('axios');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function main () {
    const result = await axios({
        method: 'POST',
        url: `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            chat_id: CHAT_ID,
            text: 'Test',
            reply_markup: {
                keyboard: [
                    [
                        {text: 'yes'},
                        {text: 'no'},
                    ],
                    [
                        {text: 'more'},
                        {text: 'less'},
                    ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        },
    });
    console.log('result.data =', result.data);
}

main().catch(error => console.error(error));
