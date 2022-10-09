// reqiures
const express = require("express");
const User = require("../models/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router();

/**
 * - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 
 * 숫자(0~9)`로 구성하기
- 비밀번호는 `최소 4자 이상이며, 
닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
 */

/**
 * joi 회원가입 schema
 */
const usersSchema = Joi.object({
  nickname: Joi.string()
    .alphanum()
    .min(3)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  password: Joi.string().min(4).required(),
  confirm: Joi.string().min(4).required(),
});

/**
 * 회원가입
 */
router.post("/signup", async (req, res) => {
  try {
    const { nickname, password, confirm } = await usersSchema.validateAsync(
      req.body
    );
    const maxUserId = await User.findOne().sort("-userId").exec();
    let userId = 1;

    if (maxUserId) userId = maxUserId.userId + 1;

    if (password.includes(nickname) || nickname.includes(password)) {
      res.status(400).send({
        errorMessage: "회원가입에 실패하였습니다.",
      });
      return;
    }

    if (password !== confirm) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
      return;
    }

    const existUsers = await User.find({ nickname });

    if (existUsers.length) {
      res.status(400).send({
        errorMessage: "중복된 닉네임입니다.",
      });
      return;
    }

    const user = new User({ userId, nickname, password });
    await user.save();

    res.status(201).send({
      message: "회원 가입에 성공하였습니다.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

/**
 * Joi 로그인 검증 schema
 */
const userAuthSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

/**
 * 로그인
 */
router.post("/login", async (req, res) => {
  try {
    const { nickname, password } = await userAuthSchema.validateAsync(req.body);

    const user = await User.findOne({ nickname, password }).exec();

    if (!user) {
      res.status(400).send({
        errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
      });
      return;
    }

    const token = jwt.sign(
      { userId: user.userId, nickname: user.nickname },
      "MySecretKey"
    );
    res.send({
      token: token,
    });
  } catch (err) {}
});

/**
 * 로그인 토큰 검증
 */
// router.get("/users/me", authMiddleware, async (req, res) => {
//   const { user } = res.locals;
//   console.log(user)
//   res.send({
//     user,
//   });
// });

module.exports = router;
