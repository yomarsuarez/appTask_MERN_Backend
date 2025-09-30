import * as brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

// Configurar el cliente de Brevo
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

export async function sendWelcomeEmail(userEmail: string, userName: string) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "🎉 Bienvenido a TaskApp MERN";
  sendSmtpEmail.to = [{ email: userEmail, name: userName }];
  sendSmtpEmail.htmlContent = `
    <h1>¡Hola ${userName} 👋!</h1>
    <p>Gracias por registrarte en <b>TaskApp MERN</b>.</p>
    <p>Ya puedes empezar a organizar tus tareas 🚀.</p>
  `;
  sendSmtpEmail.sender = {
    name: "TaskApp MERN",
    email: process.env.BREVO_SENDER_EMAIL || "noreply@example.com",
  };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email enviado correctamente:", data);
  } catch (error: any) {
    console.error(
      "❌ Error al enviar el email:",
      error.response?.body || error.message
    );
  }
}

// Ejecutar prueba
