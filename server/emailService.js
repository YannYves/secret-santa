require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Example; use your preferred provider
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmails(emails, pairs) {
  const emailPromises = emails.map((email) => {
    const secretSanta = pairs[email];
    return transporter.sendMail({
      from: '"Secret Santa" <no-reply@santa.com>',
      to: email,
      subject: 'Your Secret Santa Match!',
      text: `Hi! 🎅 Your Secret Santa is: ${secretSanta}. Happy Holidays!`,
    });
  });
  return Promise.all(emailPromises);
}

module.exports = { sendEmails };