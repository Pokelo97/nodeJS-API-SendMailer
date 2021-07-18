const router = require('express').Router();
const {body,validationResult}= require('express-validator');
const nodemailer = require("nodemailer");

const validate = [
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('subject',"The subject must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('emailBody',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
];
router.post('/sendEmail',validate, async(req,res,next) => {
    try{
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailObject={
            from: `"from " <${req.body.email}>`, 
            to: "martinmohlala0@gmail.com", 
            subject: req.body.subject, 
            text: req.body.emailBody 
        }
        // send mail with defined transport object
        transporter.sendMail(mailObject,(error,info)=>{
            if(error) res.status(400).send("Message not sent");
            console.log("Message sent: %s", info.messageId);
        });
    }
    catch(error){
        next(err);
    }
}

);

module.exports = router;