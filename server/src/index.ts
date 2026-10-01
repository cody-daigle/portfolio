import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 4000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

const app = createApp(clientOrigin);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
