const router = require("express").Router();
const User = require("./users");
const Post = require("./posts");
const Comment = require("./comment");
const Like = require("./likes");

/**
 * @swagger
 * /signup:
 *   post:
 *    tags:
 *    - [Users]
 *    summary: 회원가입
 *    description: 회원 가입
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nickname:
 *                type: string
 *              password:
 *                type: string
 *              confirm:
 *                type: string
 *    responses:
 *      201:
 *       description: 회원 가입에 성공하였습니다.
 *      400:
 *       description: 회원 가입에 실패하였습니다.
 */

/**
 * @swagger
 * /login:
 *   post:
 *    tags:
 *    - [Users]
 *    summary: 로그인
 *    description: 로그인
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nickname:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      201:
 *       description: 로그인에 성공하였습니다.
 *      400:
 *       description: 닉네임 또는 패스워드를 확인해주세요.
 */
router.post("/login");

/**
 * @swagger
 * /posts:
 *   post:
 *    tags:
 *    - [Posts]
 *    summary: 게시글 작성
 *    description: 게시글 작성
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 *    responses:
 *      201:
 *       description: 게시글 작성에 성공하였습니다.
 *      401:
 *       description: 게시글 작성에 실패하였습니다.
 */
router.post("/posts");

/**
 * @swagger
 * /posts:
 *   get:
 *    tags:
 *    - [Posts]
 *    summary: 게시글 목록 조회
 *    description: 게시글 목록 조회
 *    responses:
 *      201:
 *       description:
 *      400:
 *       description: 요청에 실패하였습니다.
 */
router.get("/posts");

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *    tags:
 *    - [Posts]
 *    summary: 게시글 상세 조회
 *    description: 게시글 상세 조회
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      201:
 *       description:
 *      400:
 *       description: 요청에 실패하였습니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               nickname:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               createdAt:
 *                 type: date
 *               updatedAt:
 *                 type: date
 *               likes:
 *                 type: integer
 */
router.get("/posts/:postId");

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *    tags:
 *    - [Posts]
 *    summary: 게시글 수정
 *    description: 게시글 수정
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 *    responses:
 *      201:
 *       description: 게시글을 수정하였습니다.
 *      401:
 *       description: 로그인된 사용자와 게시자가 다릅니다.
 */
router.put("/posts/:postId");

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *    tags:
 *    - [Posts]
 *    summary: 게시글 삭제
 *    description: 게시글 삭제
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      201:
 *       description: 게시글을 삭제하였습니다.
 *      401:
 *       description: 로그인된 사용자와 게시자가 다릅니다.
 */
router.delete("/posts/:postId");

//----------------------------------------------------------------------------------------------------
/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *    tags:
 *    - [Comments]
 *    summary: 댓글 작성
 *    description: 댓글 작성
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *    responses:
 *      201:
 *       description: 댓글을 작성하였습니다.
 *      401:
 *       description: 댓글 내용을 입력해주세요.
 */
router.post("/comments/:postId");

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *    tags:
 *    - [Comments]
 *    summary: 댓글 목록 조회
 *    description: 댓글 목록 조회
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      201:
 *       description:
 *      400:
 *       description: 요청에 실패하였습니다.
 */
router.get("/comments/:postId");

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *    tags:
 *    - [Comments]
 *    summary: 댓글 수정
 *    description: 댓글 수정
 *    parameters:
 *      - name: commentId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *    responses:
 *      201:
 *       description: 댓글을 수정하였습니다.
 *      401:
 *       description: 로그인된 사용자와 게시자가 다릅니다.
 */
router.put("/comments/:commentId");

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *    tags:
 *    - [Comments]
 *    summary: 댓글 삭제
 *    description: 댓글 삭제
 *    parameters:
 *      - name: commentId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      201:
 *       description: 댓글을 삭제하였습니다.
 *      401:
 *       description: 로그인된 사용자와 게시자가 다릅니다.
 */
router.delete("/comments/:commentId");


//------------------------------------------------------------------
/**
 * @swagger
 * /posts/like:
 *   get:
 *    tags:
 *    - [Likes]
 *    summary: 좋아요 목록 조회
 *    description: 좋아요 목록 조회
 *    responses:
 *      201:
 *       description:
 *      401:
 *       description: 로그인이 필요한 기능입니다.
 */
 router.get("/posts/like");

 /**
 * @swagger
 * /posts/{postId}/like:
 *   put:
 *    tags:
 *    - [Likes]
 *    summary: 좋아요 클릭
 *    description: 호출시 해당 게시글 좋아요 +1 한번 더 클릭하면 -1
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      201:
 *       description: 게시글의 좋아요를 등록하였습니다.
 *      401:
 *       description: 로그인이 필요한 기능입니다.
 */
router.put("/comments/:commentId");

module.exports = router;
