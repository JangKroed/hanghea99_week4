# Swagger 사용법

<http://3.35.229.128/api-docs>

접속후 구현한 API대로 작동해 볼 수있다.
~~아직 jwt토큰을 적용하지 못해 조회기능만 가능하다.~~



***

# ERD
![ERD](./img/drawSQL-export-2022-10-11_22_48.png)

***

# API
|기능|METHOD|API URL|REQUEST|RESPONSE|
|:-----:|------|-------|-------|--------|
|회원 가입|POST|/signup|{ nickname, password, confirm }|{ "message" }|
|로그인|POST|/login|{ nickname, password }|{ "token" : "..." }|
|게시글 작성|POST|/posts|{ title, content }|{ "message" }|
|게시글 조회|GET|/posts||{ data: [{ postId, userId, nickname, title, createdAt, updatedAt, likes }] }|
|게시글 상세 조회|GET|/posts/:postId||{ data: [{ postId, userId, nickname, title, content, createdAt, updatedAt, likes }] }|
|게시글 수정|PUT|/posts/:postId|{ title, content }|{ "message" }|
|게시글 삭제|DELETE|/posts/:postId||{ "message" }|
|댓글 생성|POST|/comments/:postId|{ comment }|{ "message" }|
|댓글 목록 조회|GET|/comments/:postId||{ data: [{ commentId, userId, nickname, comment, createdAt, updatedAt }] }|
|댓글 수정|PUT|/comments/:commentId|{ comment }|{ "message" }|
|댓글 삭제|DELETE|/comments/:commentId||{ "message" }|
|좋아요 게시글 조회|GET|/posts/like||{ data: [{ postId, userId, nickname, title, createdAt, updatedAt, likes }] }|
|게시글 좋아요|PUT|/posts/:postId/like||{ "message" }|
