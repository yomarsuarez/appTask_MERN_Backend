import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const config = () => {
  if (process.env.NODE_ENV === "production") {
    // Configuración para Resend en producción
    return {
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    };
  } else {
    // Configuración para Mailtrap en desarrollo
    return {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "2525"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
  }
};

export const transporter = nodemailer.createTransport(config());
