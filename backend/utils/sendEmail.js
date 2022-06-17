const nodeMailer = require("nodemailer");
const mail = require('@sendgrid/mail');
const ErrorHandler = require("./errorhandler");

const sendEmail = async(options)=>{
// const transporter = nodeMailer.createTransport({
//     service :"gmail",
//     auth:{
//       
//     }
// })
// // let transporter = nodemailer.createTransport({
// //     host: "smtp.gmail.com",
// //     port: 465,
// //     secure: true,
// //     auth: {
// //       user: "arpanjossan4@gmail.com",
// //       pass:"jossansaab99"
// //     }
// //  });
// const mailOptions = {
//     from : "smtp.gmail.com",
//     to :options.email,
//     subject:options.subject,
//     text : options.message
// }
// console.log("send Before");
// await transporter.sendMail(mailOptions)
// console.log("send");


    
      await  mail.setApiKey(process.env.SENDGRID_API)
        const userEmail =options.email;
        const userMessage = options.message
        // const userName = data.body.values?.firstName

        // Sending Thanks Email to User (who submitted the form)
        const messageForUser = {
            to: userEmail,
            from: ,
            subject: 'Thanks',
            text: "some text message",
            html: userMessage
        };

       await  mail.send(messageForUser)
           
            

    
    
}

module.exports = sendEmail