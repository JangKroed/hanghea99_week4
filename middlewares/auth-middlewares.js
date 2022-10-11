const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
      res.status(401).send({
        errorMessage: "로그인이 필요한 기능입니다.",
      });
      return;
    }
    const { userId } = jwt.verify(authToken, "MySecretKey");
    
    User.findOne({
      where: {
        userId,
      },
    }).then((user) => {
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
