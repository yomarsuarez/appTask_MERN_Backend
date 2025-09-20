import { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      process.env.FRONTEND_URL,
      "http://localhost:5173", // Para desarrollo
      "https://tu-app.vercel.app", // Tu URL de Vercel
    ].filter(Boolean); // Filtra valores undefined/null

    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const corsOptions = corsConfig;
