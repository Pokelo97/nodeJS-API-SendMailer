const {validationResult} = require('express-validator');
const nodemailer = require("nodemailer");
exports.sendMail = async(req,res,next) => {
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
            from: `"Fred Foo 👻" <${req.body.email}>`, 
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
