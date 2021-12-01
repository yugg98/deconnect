const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: 'gmail',
    auth: {
      user:"yugg9826@gmail.com",
      pass: "9826112003@aditi",
    },
  });

  const mailOptions = {
    from: "techcommunity.org@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;