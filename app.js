// reqiures
const express = require("express");
const mongoose = require("mongoose");


// db
mongoose.connect("mongodb://localhost/week4", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// express
const app = express();
const router = express.Router();

// router
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

// middlewares
app.use(express.urlencoded({ extended: false }), router);
// app.use(express.static("assets"));
app.use(express.json());
app.use([usersRouter]);
app.use([postsRouter]);
app.use([commentsRouter]);
router.get("/", (req, res) => {
  res.send({});
});

// listen
app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});
