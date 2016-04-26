### Upload Post 

*Mô tả *

Đăng bài viết

Nếu thành công bài viết sẽ được tạo ra , message , status = 1 (json). 

*Thực hiện*

url : [http://103.237.98.230/post](http://103.237.98.230/post)
method : POST 

dataType : json 
```
{
    "IDMemberProfile": String,
    "Title": String,
    "Content": String,
    "Location.Longitude": String,
    "Location.Latitude" : Sting,		
    "Status": Number // = 1 
}
```

`"Status"` = 1 là bài viết bình thường, khi bị report là 0.
