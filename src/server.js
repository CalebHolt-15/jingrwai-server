import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import { connect } from "./utils/db";
import { config } from "./config/config";
import userRouter from "./users/user.router";
import songRouter from "./songs/song.router";
import postRouter from "./posts/post.router";
import { signup } from "./utils/auth";

const app = express();

//middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", userRouter);
app.use("/song", songRouter);
app.use("/post", postRouter);
app.use("/signup", signup);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
