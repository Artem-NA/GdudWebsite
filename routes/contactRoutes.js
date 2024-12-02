const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const nameMessage=`שלום רב ${name},`;
    const agreemessage='  קיבלנו את הבקשה שלך והיא עברה לאגף האחראי, מענה יהיה תוך 24 שעות'
    const fullMessage=nameMessage+'\n\n'+agreemessage;
    const mailOptions1 = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'טנ"א פנתר- סטטוס בקשה',
        text: fullMessage
        
    };

    const mailOptions2 = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `בקשה מ${name} והמתנה לאישור`,
        text: `הודעה מ ${name} (${email}, ${phone}):\n\n${message}`
    };

    transporter.sendMail(mailOptions1, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email to user');
        } else {
            transporter.sendMail(mailOptions2, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Error sending email to admin');
                } else {
                    return res.send('<script>alert("Your request has been sent, check your email to verify!"); window.location.href = "/";</script>');
                }
            });
        }
    });
});

module.exports = router;
