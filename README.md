# API
|기능|METHOD|API URL|REQUEST|RESPONSE|
|:-----:|------|-------|-------|--------|
|게시글 작성|POST|/posts|{ user, password, title, content }|{ "message" }|
|게시글 조회|GET|/posts||{ data: [{ postId, user, title, createdAt }] }|
|게시글 상세 조회|GET|/posts/:_postId||{ data: [{ postId, user, title, content, createdAt }] }|
|게시글 수정|PUT|/posts/:_postId|{ password, title, content }|{ "message" }|
|게시글 삭제|DELETE|/posts/:_postId|{ password : "1234" }|{ "message" }|
|댓글 생성|POST|/comments/:_postId|{ user, password, content }|{ "message" }|
|댓글 목록 조회|GET|/comments/:_postId||{ data: [{ commentId, user, content, createdAt }] }|
|댓글 수정|PUT|/comments/:_comments|{ password, content }|{ "message" }|
|댓글 삭제|DELETE|/comments/:_comments|{ password }|{ "message" }|
