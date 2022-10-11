// reqiures
const express = require("express");

// Swagger
const { swaggerUi, specs } = require("./swagger/swagger");

// express
const app = express();
const router = express.Router();

// routers
const usersRouter = require("./routes/users");
const likesRouter = require("./routes/likes");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

// middlewares 첫줄 나중에 '/api 추가'
app.use(express.urlencoded({ extended: false }), router);
// app.use(express.static("assets"));
app.use(express.json());
app.use([usersRouter]);
app.use([likesRouter]);
app.use([postsRouter]);
app.use([commentsRouter]);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// listen
app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});
