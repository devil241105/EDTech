import nodemailer from 'nodemailer'

const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
        service: process.env.SMPT_SERVICE
    });

    const mailOptions= {
        Form: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);
}

export {sendEmail};