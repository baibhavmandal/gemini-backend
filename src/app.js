import express from "express";
import morgan from "morgan";

// import routes
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", indexRoutes);

export default app;
