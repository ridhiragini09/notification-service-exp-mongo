const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = async function(notification) {
  await client.messages.create({
    body: notification.message,
    from: process.env.TWILIO_PHONE,
    to: notification.to
  });
};
