const amqp = require('amqplib');
const Notification = require('../models/Notifications.js');
const sendSMS = require('../utils/sendSMS');
const sendEmail = require('../utils/sendEmail');

async function startConsumer() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const ch = await conn.createChannel();
  const q = 'notifications';
  await ch.assertQueue(q);

  ch.consume(q, async (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());
      let result = false;
      let retries = 0;
      while (!result && retries < 3) {
        try {
          if (notification.type === 'sms') {
            await sendSMS(notification);
          } else if (notification.type === 'email') {
            await sendEmail(notification);
          }
          await Notification.findByIdAndUpdate(notification._id, { status: 'sent' });
          result = true;
        } catch (err) {
          retries++;
          if (retries === 3) {
            await Notification.findByIdAndUpdate(notification._id, { status: 'failed' });
          }
        }
      }
      ch.ack(msg);
    }
  });
}

module.exports = startConsumer;
