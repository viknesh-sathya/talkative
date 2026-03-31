import dotenv from "dotenv";
dotenv.config();
console.log(process.env.NODE_ENV);
import path from "path";

import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();
const __dirname = path.resolve();
console.log("DIRNAME", __dirname);
//MIDDLEWARES
app.use(express.json());

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
app.listen(PORT, () => console.log(`🏃Server is running on port ${PORT}...🏃`));
