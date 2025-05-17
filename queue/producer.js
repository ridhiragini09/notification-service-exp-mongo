const amqp = require('amqplib');

async function sendToQueue(notification) {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const ch = await conn.createChannel();
  const q = 'notifications';
  await ch.assertQueue(q);
  ch.sendToQueue(q, Buffer.from(JSON.stringify(notification)));
  setTimeout(() => { conn.close(); }, 500);
}

module.exports = sendToQueue;
