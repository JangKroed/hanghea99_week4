// reqiures
const express = require("express");
const Post = require("../models/post");
// const Like = require("../models/like");
const Joi = require("joi");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router();

/**
 * Joi 게시글 작성 schema
 */
const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

/**
 * 게시글 작성
 */
router.post("/posts", authMiddleware, async (req, res) => {
  try {
    // body 받아오기
    const { title, content, createdAt, updatedAt } =
      await postSchema.validateAsync(req.body);
    // 토큰 정보 받아오기
    const { user } = res.locals;
    // postId 초기화
    const maxPostId = await Post.findOne().sort("-postId").exec();
    let postId = 1;
    // 내림차순해서 첫번째 값 + 1
    if (maxPostId) postId = maxPostId.postId + 1;
    // 좋아요 초기화
    let likes = 0;
    await Post.create({
      postId,
      userId: user.userId,
      nickname: user.nickname,
      title,
      content,
      createdAt,
      updatedAt,
      likes,
    });

    res.send({ message: "게시글 작성에 성공하였습니다." });
  } catch (err) {
    res.status(400).send({ errorMessage: "게시글 작성에 실패하였습니다." });
  }
});

/**
 * 게시글 목록 조회
 */
router.get("/posts", async (req, res, next) => {
  try {
    const posts = await Post.find().select({
      _id: 0,
      __v: 0,
      content: 0,
    });

    // const likes = await Like.find();
    // console.log(likes);

    res.json({
      data: posts,
    });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

/**
 * 게시글 상세 조회
 */
router.get("/posts/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    // // like에서 한번 갖다쓸 목록을 미리 가져온다
    // const posts = await Post.findOne({ postId: postId });
    // // 해당 post의 like 갯수를 체크해서 update해준다
    // const like = await Like.find({ postId: postId });
    // const likes = like.length;
    // await posts.updateOne({ postId: postId, $set: { likes } });
    // // 최종적으로 변경된 데이터를 보여준다.
    const post = await Post.find({ postId: postId }).select({
      _id: 0,
      __v: 0,
    });

    res.json({ data: post });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

/**
 * Joi 게시글 수정 schema
 */
const postPutSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

/**
 * 게시글 수정
 *
 * 토큰에서 가져온 아이디가 다를시
 * "로그인된 사용자와 게시자가 다릅니다."
 */

router.put("/posts/:postId", authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, content } = await postPutSchema.validateAsync(req.body);
    const { user } = res.locals;
    const post = await Post.findOne({ postId: postId });
    if (user.userId !== post.userId) {
      res
        .status(400)
        .send({ errorMessage: "로그인된 사용자와 게시자가 다릅니다." });
      return;
    }
    // updatedAt초기화
    let updatedAt = new Date();
    await post.updateOne({
      postId: postId,
      $set: { title, content, updatedAt },
    });

    res.send({
      message: "게시글을 수정하였습니다.",
    });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

/**
 * 게시글 삭제
 */
router.delete("/posts/:postId", authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { user } = res.locals;
    const post = await Post.findOne({ postId: postId });
    if (user.userId !== post.userId) {
      res
        .status(400)
        .send({ errorMessage: "로그인된 사용자와 게시자가 다릅니다." });
      return;
    }

    await post.deleteOne({ postId: postId });

    res.send({ message: "게시글을 삭제하였습니다." });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

module.exports = router;
