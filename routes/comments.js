// reqiures
const express = require("express");
const { Comment } = require("../models");
// const Joi = require("joi");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router();

/**
 * Joi 댓글 작성 schema
 */
// const commentSchema = Joi.object({
//   comment: Joi.string().required(),
// });

/**
 * 댓글 작성
 */
router.post("/comments/:postId", authMiddleware, async (req, res, next) => {
  try {
    // postId 파라미터 받아오기
    const { postId } = req.params;

    // body 정보 받아오기
    const { comment } = req.body;
    // const { comment, createdAt, updatedAt } = await commentSchema.validateAsync(
    //   req.body
    // );

    // 토큰 정보 받아오기
    const { user } = res.locals;

    // 댓글내용이 없을 시 에러 발생
    if (!comment.length) {
      res.status(400).send({ errorMessage: "댓글 내용을 입력해주세요." });
      return;
    }
    await Comment.create({
      postId,
      userId: user.userId,
      nickname: user.nickname,
      comment,
    });
    res.send({ message: "댓글을 작성하였습니다." });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

/**
 * 댓글 목록 조회
 */
router.get("/comments/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: {
        postId,
      },
      order: [["createdAt", "desc"]],
    });

    res.json({
      data: comments,
    });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});

/**
 * 댓글 수정
 */
router.put("/comments/:commentId", authMiddleware, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { user } = res.locals;
    const { comment } = req.body;

    const comments = await Comment.findOne({
      where: {
        commentId,
      },
    });
    if (user.userId !== comments.userId) {
      res
        .status(400)
        .send({ errorMessage: "로그인된 사용자와 게시자가 다릅니다." });
      return;
    }

    if (!comment.length) {
      res.status(400).send({ errorMessage: "댓글 내용을 입력해주세요." });
      return;
    }

    // let updatedAt = new Date(); // sql은 자동으로 업데이트 됨
    await comments.update(
      { comment },
      {
        where: { commentId },
      }
    );

    res.send({
      message: "댓글을 수정하였습니다.",
    });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다.", err });
  }
});

/**
 * 댓글 삭제
 */
router.delete(
  "/comments/:commentId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { user } = res.locals;
      const comments = await Comment.findOne({
        where: {
          commentId,
        },
      });
      if (user.userId !== comments.userId) {
        res.status(400).send({
          errorMessage: "로그인된 사용자와 게시자와 다릅니다.",
        });
        return;
      }

      await comments.destroy({
        where: {
          commentId,
        },
      });

      res.send({ message: "댓글을 삭제하였습니다." });
    } catch (err) {
      res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
    }
  }
);

module.exports = router;
