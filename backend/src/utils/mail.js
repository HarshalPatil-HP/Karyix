import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Your Website",
    link: "https://yourwebsite.com/",
  },
});

const emailVerificationContent = (username, verifyUrl) => ({
  body: {
    name: username,
    intro: "Welcome to our Website! We're very excited to have you on board.",
    action: {
      instructions: "To get started, please click here:",
      button: {
        color: "#22BC66",
        text: "Verify your account",
        link: verifyUrl,
      },
    },
    outro: "Need help, or have questions? Just reply to this email, we love to help.",
  },
});

const forgotPasswordContent = (username, passwordUrl) => ({
  body: {
    name: username,
    intro: "Welcome to our Website!",
    action: {
      instructions: "To change your password, please click here:",
      button: {
        color: "#22BC66",
        text: "Change your password",
        link: passwordUrl,
      },
    },
    outro: "Need help, or have questions? Just reply to this email, we love to help.",
  },
});

const sendEmail = async ({ to, subject, mailGenContent }) => {
  const TOKEN = process.env.IMP_TOKEN;

  const transport = nodemailer.createTransport(
    MailtrapTransport({ token: TOKEN })
  );

  const sender = {
    address: "hello@demomailtrap.co",
    name: "Karyix",
  };

  const html = mailGenerator.generate(mailGenContent);
  const text = mailGenerator.generatePlaintext(mailGenContent);

  try {
    await transport.sendMail({
      from: sender,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

export { emailVerificationContent, forgotPasswordContent, sendEmail };