const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      res.status(401).send({
        errorMessage: "로그인이 필요한 기능입니다.",
      });
      return;
    }
    const { userId } = jwt.verify(tokenValue, "MySecretKey");
    console.log("auth", userId);
    User.findOne({ userId: userId })
      .exec()
      .then((user) => {
        res.locals.user = user;
        next();
      });
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }
};
