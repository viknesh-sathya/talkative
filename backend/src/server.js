import "./loadEnv.js";

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";

const app = express({ limit: "15mb" });
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

const __dirname = path.resolve();
console.log(process.env.NODE_ENV);

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// For deployments
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")),
  );
}

// SERVER
const PORT = process.env.PORT || 3000;
connectDB().then(() =>
  app.listen(PORT, () =>
    console.log(`🏃Server is running on port ${PORT}...🏃`),
  ),
);
