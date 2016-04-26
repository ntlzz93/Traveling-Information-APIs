### Find Post By Keyword 

*Mô tả *

Tìm kiếm bài viết theo từ khóa.

Thực hiện tìm kiếm bài viết qua text search ( tìm kiếm bằng chuỗi nhập vào ), sau đó  client dùng google map api android để chuyển cái chuỗi đó thành `location` (json).

[https://developers.google.com/maps/android/](https://developers.google.com/maps/android/) 

*Thực hiện*

url : [http://103.237.98.230/post/findByKeyWord/:location](http://103.237.98.230/post/findByKeyWord/:location)
method : GET 

`:location` là kinh độ và vĩ độ của bài viết.Có dạng `location` = `Longitude,Latitude`. Ví dụ `location` = `98734342342,4324234323423`
