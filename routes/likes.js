// reqiures
const express = require("express");
const Like = require("../models/like");
const Post = require("../models/post");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router();

/**
 * 좋아요 목록 조회
 */
router.get("/posts/like", authMiddleware, async (req, res, next) => {
  try {
    // 로그인 검증 + user의 Id값을 받아온다.
    const { user } = res.locals;
    // 유저가 좋아요를 누를 목록들을 받아온다.
    const likes = await Like.find({ userId: user.userId });
    // posts에서 해당 user가 좋아요 누른 목록만 가져오기위해 map을 써준다.
    const likePostIds = likes.map((post) => post.postId);
    // 최종적으로 posts로 가져올때 postId: [1,3,4,5] 식이 성립하므로 사용.
    const posts = await Post.find({ postId: likePostIds }).select({
      _id: 0,
      __v: 0,
      content: 0,
    });

    res.json({ data: posts });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

/**
 * 좋아요 클릭
 */
router.put("/posts/:postId/like", authMiddleware, async (req, res, next) => {
  try {
    // 파라미터로 확인하여 좋아요를 누를 postId
    const { postId } = req.params;

    // 로그인 검증과 likes테이블에 저장할 userId
    const { user } = res.locals;

    // 필요한 post의 postId와 like의 postId 조회를 위해 찾아준다.
    const posts = await Post.findOne({ postId: postId });
    let likes = await Like.find({ postId: postId });

    // likes의 전체 목록을 불러오므로 일치하는 값으로 초기화
    [likes] = likes.filter((like) => like.userId === user.userId);

    // 게시글 좋아요가 0인데 조회하면 undefined이 리턴되므로 바로넣어준다.
    if (likes === undefined) {
      await Like.create({
        postId: posts.postId,
        userId: user.userId,
      });
      res.send({ message: "게시글의 좋아요를 등록하였습니다" });
      return;
    }

    // userId를 서로 조회해서 일치하지 않으면 추가, 있으면 삭제
    if (user.userId !== likes.userId) {
      await Like.create({ postId: posts.postId, userId: user.userId });
      res.send({ message: "게시글의 좋아요를 등록하였습니다" });
    } else {
      await likes.deleteOne({ userId: user.userId });
      res.send({ message: "게시글의 좋아요를 취소하였습니다." });
    }
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

module.exports = router;

// let a = null;
// if (a === null) a = 0;
// console.log(a);
