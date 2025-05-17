require('dotenv').config();
const FormData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
 
});

module.exports = async function sendEmail(notification) {
  const data = {
    from: `Your App <postmaster@${process.env.MAILGUN_DOMAIN}>`,
    to: notification.to, 
    subject: notification.subject , 
    text: notification.message 
  };

  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Email error:", error);
    throw error; 
  }
};
