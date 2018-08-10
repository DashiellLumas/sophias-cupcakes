import express from 'express';
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

export const app = express();

app.set('view engine', 'ejs');

app.use('/', express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/cateringRequest', function (req, res){
  let mailOpts, smtpTrans;
  var username = process.env.GMAIL_USERNAME;
  var password = process.env.GMAIL_PASSWORD;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  mailOpts = {
    from: req.body.reservationName + ' &lt;' + req.body.reservationEmail + '&gt;',
    to: username,
    subject: 'New catering request from sophieselection.com!',
    text: `You received a catering request from:${req.body.reservationName} at: (${req.body.reservationEmail})
    \n Phone Number: ${req.body.phonenumber}
    \n Date and Time: ${req.body.dateAndTime}
    \n Number of People: ${req.body.numberOfPeople}
    \n Additional Info and Requests: ${req.body.requests}
    `
  };
  smtpTrans.sendMail(mailOpts, function (error, response){
    if(error){
      console.log(error);
    }
    else {
      console.log('Message sent:' + response.response)
      res.send(200);
    }
  });
});


app.post('/contact', function (req, res){
  let mailOpts, smtpTrans;
  var gmail_email = 'dlumastest';
  var gmail_pass = 'dlumastest';
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dlumastest@gmail.com',
      pass: 'dummy512'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'dlumastest@gmail.com',
    subject: 'New message from sophieselection.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response){
    if(error){
      console.log(error);
    }
    else {
      console.log('Message sent:' + response.response)
      res.send(200);
    }
  });
});
