import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth-middlewares";

const router = express.Router();

/**
 * 회원가입
 */
router.post("/signup", async (req, res) => {
  const { nickname, password, confirm } = req.body;

  const maxUserId = await User.findOne().sort("-userId").exec();
  let userId = 1;

  if (maxUserId) userId = maxUserId.userId + 1;

  if (password !== confirm) {
    res.status(400).send({
      errorMessage: "패스워드가 서로 다릅니다.",
    });
    return;
  }

  const existUsers = await User.findOne({ nickname });
  if (existUsers) {
    res.status(400).send({ errorMessage: "중복된 닉네임입니다." });
    return;
  }

  const user = new User({ userId, nickname, password });
  await user.save();

  res.status(201).send({ message: "회원 가입에 성공하였습니다." });
});

/**
 * 로그인
 */
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  const user = await User.findOne({ nickname, password }).exec();

  if (!user) {
    res.status(400).send({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
    });
    return;
  }

  const token = jwt.sign({ userId: user.userId }, "MySecretKey");
  res.json({ token: token });
});

/**
 * 로그인 토큰 검증
 */
router.get("/users/me", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  console.log(user);
  res.send({
    user: {
      nickname: user.nickname,
    },
  });
});

export default router;
