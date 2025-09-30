import colors from "colors";
import server from "./server";

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(
    "Brevo API Key:",
    process.env.BREVO_API_KEY?.substring(0, 10) + "..."
  );
  console.log("Brevo Sender:", process.env.BREVO_SENDER_EMAIL);

  console.log(colors.cyan.bold(`REST API working in port ${port}`));
});
