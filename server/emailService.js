const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Example; use your preferred provider
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,  
  auth: {
      user: 'joannie.denesik@ethereal.email',
      pass: 'J1zh1F8NYRYTsmvXd5'
  }
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