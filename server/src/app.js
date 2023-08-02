import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.LIVE_URL,
  })
);

app.use(cookieParser());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello From Backend Server!");
  console.log("Cookies: ", req.cookies);
});

app.all("*", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
