import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();


export const transporter = nodeMailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    auht:{
        user:process.env.MAIL_USERNAME,
        pass:process.env.MAIL_PASSWORD
    },

 // Verfiy the tranporter connection
  transporter.verify((error, success) =>{
    if(error){
        console.error("Error in email transporter", error);
    } else {
        console.error("Email transporter is ready to take message");
    }
  })
})