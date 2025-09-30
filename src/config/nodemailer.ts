import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const config = () => {
  if (process.env.NODE_ENV === "production") {
    // Configuración para Gmail en producción usando SMTP explícito
    return {
      host: "smtp.gmail.com",
      port: 465,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
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
