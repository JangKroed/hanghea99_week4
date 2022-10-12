const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const options = {
  info: {
    title: "hanghea99_week4",
    description:
      "프로젝트 설명 Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
  },
  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      in: "header",
      bearerFormat: "JWT",
    },
  },
};
const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./routes/users.js",
  "./routes/posts.js",
  "./routes/comments.js",
  "./routes/likes.js",
];
swaggerAutogen(outputFile, endpointsFiles, options);
