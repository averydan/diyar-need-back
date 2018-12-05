var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'zoho',
    auth: {
        user: 'elevenfifty@zoho.com',
        pass: 'B9i18O691!'
    }
});

// var auth = { mail: { host: 'smtp.zoho.com', port: 465, secure: true, auth: { user: 'elevenfifty@zoho.com', pass: 'B9i18O69' } };
// var log = require('./log');

// var transporter = nodemailer.createTransport(auth.mail, {from: auth.mail.auth.user});


router.post('/send', function (req, res) {
    var mailOptions = {
        from: 'Avery from Slack <avery@averyvann.com>',
        to: req.body.email.to,
        subject: 'Slack Password Recovery',
        text: `Hello, ${req.body.email.name}! Click here to reset your password.`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            res.send('Email sent: ' + info.response);
            console.log(req)
        }

    });

});


router.post('/funsend', function (req, res) {
    var mailOptions = {
        from: 'doug@zoho.com',
        to: req.body.email.to,
        subject: 'Merry Christmas',
        text: `Merry Christmas Avery! I got you a car!`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            res.send('Email sent: ' + info.response);
            console.log(req)
        }

    });

});

module.exports = router;