const nodemailer = require('nodemailer');
const { generateRandom4DigitNumber } = require('./common');

// need to create 4/6 digit random number and send it to user email as well
// need to store this digit in redis or mongodb to verify it later

// Create a transporter using Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your@gmail.com',
    pass: 'your-gmail-password'
  }
});

// Email options
const mailOptions = {
  from: 'your@gmail.com',
  to: 'recipient@example.com',
  subject: 'Otp for registration',
  text: 'your OTP is ' + generateRandom4DigitNumber()
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Email sent:', info.response);
  }
});
