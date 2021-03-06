const sgMail = require('@sendgrid/mail');
const Express = require('express');
const router = Express.Router();

router.post('/', function (req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'burdipolis@gmail.com',
        from: 'aerocus.efher@gmail.com',
        subject: "Burdipolis Website Message : " + req.body.subject,
        text: req.body.text,
        html: "From: " + req.body.name + " " + req.body.firstname + "<br>" +
            "User's email: " + req.body.user + "<br>" +
            "Message: " + req.body.text,
    };
    sgMail.send(msg, (error, result) => {
        if (error) {
            console.log(err);
            res.end("error");
        }
        else {
            res.end("sent");
        }
    });

});

module.exports.router = router;