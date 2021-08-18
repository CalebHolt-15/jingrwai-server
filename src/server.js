//server
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
  path.join(__dirname, "../sslcert/localhost.pem"),
  "utf8"
);

const privateKey = fs.readFileSync(
  path.join(__dirname, "../sslcert/localhost-key.pem"),
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
};

const app = express();
const httpsServer = https.createServer(credentials, app);

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

app.disable("x-powered-by");
app.use(
  cors({
    origin: "https://localhost:3000", //connect to client
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Headers",
    ],
    credentials: true,
  })
);

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

//httpsServer fxn that start the server on 8090
export const start = async () => {
  try {
    await connect();
    httpsServer.listen(8090, () => {
      console.log("Server Started on https://localhost:8090");
    });
  } catch (e) {
    console.error(e);
  }
};
