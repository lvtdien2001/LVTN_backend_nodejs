# API
## User API
- POST /auth/register: đăng ký tài khoản
- POST /auth/login: đăng nhập
- GET /user: trả về tất cả users trong database
- GET /user/:id : trả về user dựa trên id
- PUT /user/:id : sửa thông tin user dựa trên id
- PUT /user/update-avatar/:id : cập nhật avatar của user dựa trên id
- PUT /user/disable/:id : khóa hoặc mở tài khoản dựa trên id
## Address API
- GET /address: trả về tất cả địa chỉ của user đang đăng nhập
- GET /address/:id : trả về một địa chỉ dựa trên id
- POST /address: thêm một địa chỉ mới
- PUT /address/:id : sửa thông tin địa chỉ dựa trên id
- PUT /address/change-default/:id : thay đổi địa chỉ mặc định dựa trên id
- DELETE /address/:id : xóa địa chỉ dựa trên id
## 
