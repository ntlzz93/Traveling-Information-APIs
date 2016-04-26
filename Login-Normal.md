## Login APIs

### Login with normal account

*Mô Tả* : Chức năng này cho phép thực hiện đăng nhập bằng tài khoản bình thường.
Nếu thành công nó sẽ trả về 1 chuỗi json của đối tượng vừa đăng nhập, message thông báo và status = 1.

*Thực hiện* :

URL = [](http://103.237.98.230/login)

Method = POST

dataType - json 
```
{
	username : String, 
	password : String
}
```
