const nodeMailer = require('nodemailer');
const { baseUrl, smtp } = require('../config');

const mailer = {
  sendActivationMessage( login, email, token ) {
    let link = `${baseUrl}/auth/account-activation/${login}/${token}`;
    let content = `Hello, ${login}! To activate your account on Matcha, please follow the link ${link}`;
    let subject = 'Matcha registration!';
    this.sendMessage(email, subject, content);
  },
  sendMessage(to, subject, content) {
    let transport = nodeMailer.createTransport(smtp);
    transport.sendMail({ to: to, subject: subject, text: content});
  },
  sendNewPassword(login, email, password) {
    let content = `Hi, ${login}! Here is your new password: ${password} from your Matcha account!`;
    let subject = 'Mactha password reset';
    this.sendMessage(email, subject, content);
  }
};

module.exports = mailer;