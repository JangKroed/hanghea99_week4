import express from "express";
import PostModel from "../schemas/post.js";
import CommentModel from "../schemas/comment.js";


const router = express.Router();

/**
 * 게시글 작성
 */
router.post("/posts", async (req, res) => {
  const { userId, title, content, createdAt, updatedAt } = req.body;
  // userId랑 nickname은 토큰 디코드한 값을 넣어서 넣을까 말까
  const maxPostId = await Post.findOne().sort("-postId").exec();
  let postId = 1;

  if (maxPostId) postId = maxPostId.postId + 1;

  let likes = 0;

  await Post.create({
    postId,
    // userId,
    nickname,
    title,
    content,
    createdAt,
    updatedAt,
    likes,
  });

  res.send({ message: "게시글 작성에 성공하였습니다." });
});

/**
 * 게시글 조회
 */
router.get("/posts", async (req, res) => {
  const posts = await Post.find();

  const result = posts.map((post) => {
    return {
      postId: post.postId,
      // userId:user.userId,
      nickname: post.nickname,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likes:post.likes,
    };
  });

  res.json({
    data: result,
  });
});

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const posts = await Post.find();
  const result = posts.map((post) => {
    return {
      postId: post.postId,
      // userId:user.userId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likes:post.likes,
    };
  });

  const [detail] = result.filter((post) => post.postId == postId);

  res.json({
    data: detail,
  });
});

export default router;
