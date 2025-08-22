// Pseudo node.js code
const axios = require('axios');

app.post('/webhook', async (req, res) => {
  const incomingMsg = req.body.message;

  // Use OpenAI to generate reply
  const aiReply = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-4",
    messages: [
      {role: "system", content: "You're an order assistant."},
      {role: "user", content: incomingMsg}
    ]
  }, {
    headers: {
      Authorization: `Bearer YOUR_OPENAI_API_KEY`
    }
  });

  const replyText = aiReply.data.choices[0].message.content;

  // Send reply to WhatsApp
  await axios.post('https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages', {
    messaging_product: "whatsapp",
    to: req.body.from,
    text: { body: replyText }
  }, {
    headers: {
      Authorization: `Bearer YOUR_FACEBOOK_PAGE_ACCESS_TOKEN`
    }
  });

  res.sendStatus(200);
});
