import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // sends to the owner's email by default
};

export const sendAutoReply = async (userEmail: string, userName: string) => {
    const mail = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Message Received - Thank you for reaching out!',
        text: `Hi ${userName},\n\nThank you for reaching out. I have received your message and will get back to you as soon as possible.\n\nBest regards,\nZamin Askari Rizvi`,
        html: `<p>Hi <strong>${userName}</strong>,</p><p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p><br><p>Best regards,<br>Zamin Askari Rizvi</p>`,
    };

    await transporter.sendMail(mail);
};
