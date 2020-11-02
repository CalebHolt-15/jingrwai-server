import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import { connect } from "./utils/db";
import { config } from "./config/config";
import userRouter from "./users/user.router";
import songRouter from "./songs/song.router";
import postRouter from "./posts/post.router";
import { protect, signin, signup } from "./utils/auth";
import fs from "fs";
import https from "https";
import path from "path";

const certificate = fs.readFileSync(
  path.join(__dirname, "cert/server.cert"),
  "utf8"
);

const privateKey = fs.readFileSync(
  path.join(__dirname, "cert/private.key"),
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
};

const app = express();
const httpsServer = https.createServer(credentials, app);

//middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello");
});

//order matter
app.use("/signup", signup);
app.use("/signin", signin);
app.use(protect); //belows are protected
app.use("/user", userRouter);
app.use("/song", songRouter);
app.use("/post", postRouter);

export const start = async () => {
  try {
    await connect();
    httpsServer.listen(config.port, () => {
      console.log(`REST API on https://localhost:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
