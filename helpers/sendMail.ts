const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
export const sendEmail = async() => {
    console.log('Credentials obtained, sending message...');
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
            service: "Outlook365",
            //port: 465,
            //secure: false,
            auth: {
              user: 'fake@outlook.com',
              pass: ''
            },
            //logger: false,
            //debug: false, // if true then include SMTP traffic in the logs
          },
        {
            from: 'fake@outlook.com',
        }
    );

    // Message object
    let message = {
        // Comma separated list of recipients
        to: 'fake@gmail.com',

        // Subject of the message
        subject: 'SAUDI ARABIA TICKETS AVAILABLE',

        // plaintext body
        text: 'SAUDI ARABIA TICKETS AVAILABLE'
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
}
