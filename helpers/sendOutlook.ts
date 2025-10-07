import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

export const sendMail = () =>{
    const transporter = nodemailer.createTransport({
        service : "hotmail",
        auth : {
            user : "fake@outlook.com",
            pass : ""
        }
    })

    const options = {
        from : "fake@outlook.com", 
        to: "fake@gmail.com", 
        subject: "Reset password", 
        text: "Here is a reset token."
    }

    transporter.sendMail(options, (error, info) =>{
        if(error) console.log(error)
        else console.log(info)
    })

}