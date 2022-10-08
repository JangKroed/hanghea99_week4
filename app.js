// imports
import express from "express";
import mongoose from "mongoose";
import Joi from "joi";

import indexRouter from "./routes/index.js";

import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import commentsRouter from "./routes/comments";

// express
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }), router);
app.use(express.static("assets"));

// routers 여기에 url ㄱㄴ?
app.use([usersRouter]);
app.use([postsRouter]);
app.use([commentsRouter]);

router.get("/", (req, res) => {
  res.send("123");
});

// create 404
app.use((req, res, next) => {
  const error = new Error("NOT FOUND");

  res.status(404).json({ message: error.message });
});

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});

// db
mongoose.connect("mongodb://localhost/week4", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("errer", console.error.bind(console, "connection error"));
