const express = require('express');
const bodyParser = require('body-parser');
const { randomDraw } = require('./randomDraw');
const { sendEmails } = require('./emailService');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
  
app.post('/draw', async (req, res) => {
  console.log('la')
  try {
    const emails = req.body.emails;
    const result = randomDraw(emails);
    await sendEmails(emails, result);
    res.status(200).send({ message: "Emails sent successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});