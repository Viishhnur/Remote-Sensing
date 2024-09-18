const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: "97a10228",
  apiSecret: "6QFpNAckORl5P3z0"
});

// Correct syntax for exporting the async function in an object
module.exports = {
  sendSMS: async function(to, from, text) {
    try {
      const response = await vonage.sms.send({ to, from, text });
      console.log('Message sent successfully');
      console.log(response);
    } catch (err) {
      console.error('There was an error sending the message.');
      throw err;
    }
  }
};
