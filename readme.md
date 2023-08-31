# API
## User API
* POST /auth/register: đăng ký tài khoản
* POST /auth/login: đăng nhập
* GET /user: trả về tất cả users trong database
* GET /user/:id : trả về user dựa trên id
* PUT /user/:id : sửa thông tin user dựa trên id
* PUT /user/update-avatar/:id : cập nhật avatar của user dựa trên id
* PUT /user/disable/:id : khóa hoặc mở tài khoản dựa trên id
## Address API
* GET /address: trả về tất cả địa chỉ của user đang đăng nhập
* GET /address/:id : trả về một địa chỉ dựa trên id
* POST /address: thêm một địa chỉ mới
* PUT /address/:id : sửa thông tin địa chỉ dựa trên id
* PUT /address/change-default/:id : thay đổi địa chỉ mặc định dựa trên id
* DELETE /address/:id : xóa địa chỉ dựa trên id
## Brand API
* GET /brand: trả về tất cả thương hiệu trong database
* GET /brand/:id : trả về một thương hiệu dựa trên id
* POST /brand: thêm một thương hiệu mới
* PUT /brand/:id : sửa thông tin thương hiệu dựa trên id
* DELETE /brand/:id : xóa thương hiệu dựa trên id
## Product API
* GET /product: trả về tất cả sản phẩm trong database
* GET /product/:id : trả về một sản phẩm dựa trên id
* POST /product: thêm một sản phẩm mới
* PUT /product/:id : sửa thông tin sản phẩm dựa trên id
* DELETE /product/:id : xóa sản phẩm dựa trên id
* Mã dữ liệu:
Dòng sản phẩm

| Code |     01    |    02    |     03     |    04    |    05    |
|-----:|-----------|----------|------------|----------|----------|
| Name | Thời trang| Hiện đại | Sang trọng | Thể thao | Quân đội |

Dây đeo

Code | 01 | 02 | 03 | 04 |
--- | --- | --- | --- |--- |
Name | Dây da | Dây kim loại | Dây nhựa | Dây vải |

Mặt kính

Code | 01 | 02 | 03 |
--- | --- | --- | --- |
Name | Kính khoáng Mineral (Kính cứng) | Sapphire (Kính Chống Trầy) | Resin Glass (Kính Nhựa) |

Bộ máy

Code | 01 | 02 |
--- | --- | --- |
Name | Cơ tự động (Automatic) | Quartz (Pin) |

## Cart API
* GET /cart: trả về tất cả sản phẩm trong giỏ hàng của user đang đăng nhập
* GET /cart/:id : trả về một sản phẩm trong giỏ hàng dựa trên id
* POST /cart: thêm một sản phẩm vào giỏ hàng
* PUT /cart/:id : cập nhật số lượng sản phẩm trong giỏ hàng dựa trên id
* DELETE /cart/:id : xóa sản phẩm khỏi giỏ hàng dựa trên id

## Supplier API
* GET /supplier: trả về tất cả nhà cung cấp trong database
* GET /supplier/:id : trả về một nhà cung cấp dựa trên id
* POST /supplier: thêm một nhà cung cấp mới
* PUT /supplier/:id : cập nhật thông tin nhà cung cấp dựa trên id
* DELETE /supplier/:id : xóa một nhà cung cấp dựa trên id

## Goods received note API
* GET /goods-received-note: trả về tất cả phiếu nhập kho trong database
* GET /goods-received-note/:id : trả về một phiếu nhập kho dựa trên id
* POST /goods-received-note: thêm một phiếu nhập kho mới
* PUT /goods-received-note/:id : cập nhật thông tin phiếu nhập kho dựa trên id
* DELETE /goods-received-note/:id : xóa một phiếu nhập kho dựa trên id