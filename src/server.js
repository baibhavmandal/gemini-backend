import dotenv from "dotenv";
import process from "process";

import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {});
