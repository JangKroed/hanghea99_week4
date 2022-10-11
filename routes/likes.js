// reqiures
const express = require("express");
const { Like, Post } = require("../models");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router();

/**
 * 좋아요 목록 조회
 */
router.get("/posts/like", authMiddleware, async (req, res, next) => {
  try {
    // 로그인 검증 + user의 Id값을 받아온다.
    const { user } = res.locals;

    // 유저가 좋아요를 누른 목록들을 받아온다.
    const likes = await Like.findAll({ where: { userId: user.userId } });

    // posts에서 해당 user가 좋아요 누른 목록만 가져오기위해 map을 써준다.
    const likePostIds = likes.map((post) => post.postId);

    // 최종적으로 posts로 가져올때 postId: [1,3,4,5] 식이 성립하므로 사용.
    const posts = await Post.findAll({
      where: {
        postId: likePostIds,
      },
      attributes: {
        exclude: ["content"],
      },
    });

    res.json({ data: posts });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

/**
 * 좋아요 클릭
 *
 * put 요청시 바로 적용.
 */
router.put("/posts/:postId/like", authMiddleware, async (req, res, next) => {
  try {
    // 파라미터로 확인하여 좋아요를 누를 postId
    const { postId } = req.params;

    // 로그인 검증과 likes테이블에 저장할 userId
    const { user } = res.locals;

    // 필요한 post의 postId와 like의 postId 조회를 위해 찾아준다.
    const posts = await Post.findOne({ where: { postId } });
    let likes = await Like.findAll({ where: { postId } });

    // likes의 전체 목록을 불러오므로 일치하는 값으로 초기화
    [likes] = likes.filter((like) => like.userId === user.userId);

    // 해당 유저가 좋아요를 안눌렀다면 추가, 아니라면 삭제
    if (!likes) {
      await Like.create({
        postId: posts.postId,
        userId: user.userId,
      });
      await Post.increment({ likes: 1 }, { where: { postId } });
      res.send({ message: "게시글의 좋아요를 등록하였습니다." });
    } else {
      await likes.destroy({ where: { userId: user.userId } });
      await Post.increment({ likes: -1 }, { where: { postId } });
      res.send({ message: "게시글의 좋아요를 취소하였습니다." });
    }
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

module.exports = router;
