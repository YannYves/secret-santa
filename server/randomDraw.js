function randomDraw(emails) {
    if (emails.length < 2) throw new Error('At least two emails are required.');
  
    const shuffled = [...emails].sort(() => Math.random() - 0.5);
    const pairs = {};
    for (let i = 0; i < emails.length; i++) {
      pairs[emails[i]] = shuffled[(i + 1) % shuffled.length];
    }
    return pairs;
  }
  
  module.exports = { randomDraw };