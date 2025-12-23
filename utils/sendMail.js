import nodemailer from "nodemailer";

// sendEmail function
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // 1️⃣ Transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,      // e.g., smtp.gmail.com
      port: process.env.SMTP_PORT,      // 465 for SSL, 587 for TLS
      secure: process.env.SMTP_PORT == 465, // true for 465
      auth: {
        user: process.env.SMTP_USER,    // your email
        pass: process.env.SMTP_PASS     // your email password or app password
      }
    });

    // 2️⃣ Mail options
    const mailOptions = {
      from: `"Travel Agency" <${process.env.SMTP_USER}>`,
      to,          // recipient email
      subject,     // email subject
      text,        // plain text
      html         // html content
    };

    // 3️⃣ Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
