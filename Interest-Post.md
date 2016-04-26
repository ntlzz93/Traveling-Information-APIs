### Interested Post 

*Mô tả *

Quan tâm bài viết

Nếu current user quan tâm bài viết thì bài số quân tâm tăng lên 1 và nếu quan tâm rồi mà  quan tâm 1 lần nữa thì là bỏ quan tâm .
`:postId` là mã của bài viết đó.

*Thực hiện*

url : [http://103.237.98.230/post/interest/:postId](http://103.237.98.230/post/interest/:postId)
method : PUT 

dataType : json 
```
{
    "IDMemberProfile": String 
}
```
`IDMemberProfile` : id của thằng user đang sử dụng ứng dụng ( current user ).
