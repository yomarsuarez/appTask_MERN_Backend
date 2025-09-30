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
      // Para Gmail - usa tu email de Gmail
      return `"TaskApp MERN" <${process.env.EMAIL_USER}>`;
    } else {
      // Para Mailtrap - cualquier email funciona
      return "Task <admin@task.com>";
    }
  }

  static sendConfirmationEmail = async (user: IEmail) => {
    try {
      const info = await transporter.sendMail({
        from: AuthEmail.getFromEmail(),
        to: user.email,
        subject: "TaskApp - Confirm your account",
        text: "Confirm your account",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">TaskApp MERN</h1>
            </div>
            
            <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Hello ${user.name}! 👋</h2>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Thank you for registering with TaskApp. Please confirm your account to get started and access all features.
              </p>
              
              <div style="margin: 30px 0; text-align: center;">
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 14px 32px; 
                          text-decoration: none; 
                          border-radius: 6px; 
                          display: inline-block;
                          font-weight: bold;
                          box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                  Confirm Your Account
                </a>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; color: #666; font-size: 14px; text-align: center;">
                  Or enter this confirmation code manually:
                </p>
                <p style="font-size: 28px; 
                          color: #667eea; 
                          text-align: center; 
                          font-weight: bold; 
                          letter-spacing: 4px; 
                          margin: 15px 0;">
                  ${user.token}
                </p>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center;">
                ⏰ This token expires in 10 minutes
              </p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
              
              <p style="color: #999; font-size: 12px; text-align: center;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
          </div>
        `,
      });
      console.log("✅ Confirmation email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending confirmation email:", error);
      throw error;
    }
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    try {
      const info = await transporter.sendMail({
        from: AuthEmail.getFromEmail(),
        to: user.email,
        subject: "TaskApp - Reset your password",
        text: "Reset your password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">TaskApp MERN</h1>
            </div>
            
            <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">Hello ${user.name}! 🔐</h2>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                You have requested to reset your password for your TaskApp account. Click the button below to create a new password.
              </p>
              
              <div style="margin: 30px 0; text-align: center;">
                <a href="${process.env.FRONTEND_URL}/auth/new-password" 
                   style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
                          color: white; 
                          padding: 14px 32px; 
                          text-decoration: none; 
                          border-radius: 6px; 
                          display: inline-block;
                          font-weight: bold;
                          box-shadow: 0 4px 6px rgba(245, 87, 108, 0.3);">
                  Reset Your Password
                </a>
              </div>
              
              <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #f5576c;">
                <p style="margin: 0; color: #666; font-size: 14px; text-align: center;">
                  Or enter this reset code manually:
                </p>
                <p style="font-size: 28px; 
                          color: #f5576c; 
                          text-align: center; 
                          font-weight: bold; 
                          letter-spacing: 4px; 
                          margin: 15px 0;">
                  ${user.token}
                </p>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center;">
                ⏰ This token expires in 10 minutes
              </p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
              
              <p style="color: #999; font-size: 12px; text-align: center;">
                If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.
              </p>
            </div>
          </div>
        `,
      });
      console.log("✅ Password reset email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Error sending password reset email:", error);
      throw error;
    }
  };
}
