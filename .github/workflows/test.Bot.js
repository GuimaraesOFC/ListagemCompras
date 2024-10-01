const axios = require('axios');

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = '7344119483'; // Substitua pelo seu chat ID

async function testBot() {
    try {
        const message = 'Teste de mensagem do bot!';
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        
        const response = await axios.post(url, {
            chat_id: chatId,
            text: message,
        });

        if (response.data.ok) {
            console.log('Mensagem enviada com sucesso!');
        } else {
            console.log('Erro ao enviar mensagem:', response.data.description);
        }
    } catch (error) {
        console.error('Erro ao se comunicar com o bot:', error);
    }
}

testBot();
