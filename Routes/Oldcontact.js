const Express = require('express');
const Nodemailer = require('nodemailer');

const router = Express.Router();

const smtpTransport = Nodemailer.createTransport({

    service: 'Gmail',
    host: "smtp.gmail.com",
    auth: {
        // enter your gmail account
        user: 'aerocus.efher@gmail.com',
        // enter your gmail password
        pass: 'nkeagvyufsxqnmli'
    }
});

router.post('/', function (req, res) {
    const mailOptions = {
        to: req.body.to,
        subject: "Burdipolis Website Message: " + req.body.subject,
        from: "Contact Form Request" + "<" + req.query.from + '>',
        html:  "From: " + req.body.name + " " + req.body.firstname + "<br>" +
        "User's email: " + req.body.user + "<br>" +
        "Message: " + req.body.text
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log(err);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });

});

module.exports.router = router;
