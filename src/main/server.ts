import dotenv from "dotenv";

import app from "./config/app";

dotenv.config();
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`app running at port ${port}`);
});
