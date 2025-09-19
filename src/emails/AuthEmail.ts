import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  // Función para obtener el remitente según el ambiente
  private static getFromEmail() {
    if (process.env.NODE_ENV === "production") {
      // Para Resend - usa el dominio de prueba o tu dominio verificado
      return "TaskApp <onboarding@resend.dev>"; // o "TaskApp <noreply@tudominio.com>"
    } else {
      // Para Mailtrap - cualquier email funciona
      return "Task <admin@task.com>";
    }
  }

  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: AuthEmail.getFromEmail(),
      to: user.email,
      subject: "TaskApp - Confirm your account",
      text: "Confirm your account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hello ${user.name}!</h2>
          <p>Thank you for registering with TaskApp. Please confirm your account to get started.</p>
          
          <div style="margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account" 
               style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Confirm Your Account
            </a>
          </div>
          
          <p>Or enter this confirmation code: <strong style="font-size: 18px; color: #4CAF50;">${user.token}</strong></p>
          <p style="color: #666; font-size: 14px;">This token expires in 10 minutes</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    });
    console.log("Confirmation email sent", info.messageId);
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: AuthEmail.getFromEmail(),
      to: user.email,
      subject: "TaskApp - Reset your password",
      text: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hello ${user.name}!</h2>
          <p>You have requested to reset your password for your TaskApp account.</p>
          
          <div style="margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/auth/new-password" 
               style="background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Your Password
            </a>
          </div>
          
          <p>Or enter this reset code: <strong style="font-size: 18px; color: #ff6b35;">${user.token}</strong></p>
          <p style="color: #666; font-size: 14px;">This token expires in 10 minutes</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">If you didn't request this password reset, you can safely ignore this email.</p>
        </div>
      `,
    });
    console.log("Password reset email sent", info.messageId);
  };
}
