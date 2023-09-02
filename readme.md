# API
## User API
* POST /api/auth/register: đăng ký tài khoản
* POST /api/auth/login: đăng nhập
* GET /api/user: trả về tất cả users trong database
* GET /api/user/:id : trả về user dựa trên id
* PUT /api/user/:id : sửa thông tin user dựa trên id
* PUT /api/user/update-avatar/:id : cập nhật avatar của user dựa trên id
* PUT /api/user/disable/:id : khóa hoặc mở tài khoản dựa trên id
## Address API
* GET /api/address: trả về tất cả địa chỉ của user đang đăng nhập
* GET /api/address/:id : trả về một địa chỉ dựa trên id
* POST /api/address: thêm một địa chỉ mới
* PUT /api/address/:id : sửa thông tin địa chỉ dựa trên id
* PUT /api/address/change-default/:id : thay đổi địa chỉ mặc định dựa trên id
* DELETE /api/address/:id : xóa địa chỉ dựa trên id
## Brand API
* GET /api/brand: trả về tất cả thương hiệu trong database
* GET /api/brand/:id : trả về một thương hiệu dựa trên id
* POST /api/brand: thêm một thương hiệu mới
* PUT /api/brand/:id : sửa thông tin thương hiệu dựa trên id
* DELETE /api/brand/:id : xóa thương hiệu dựa trên id
## Product API
* GET /api/product: trả về tất cả sản phẩm trong database
* GET /api/product/:id : trả về một sản phẩm dựa trên id
* POST /api/product: thêm một sản phẩm mới
* PUT /api/product/:id : sửa thông tin sản phẩm dựa trên id
* DELETE /api/product/:id : xóa sản phẩm dựa trên id
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
* GET /api/cart: trả về tất cả sản phẩm trong giỏ hàng của user đang đăng nhập
* GET /api/cart/:id : trả về một sản phẩm trong giỏ hàng dựa trên id
* POST /api/cart: thêm một sản phẩm vào giỏ hàng
* PUT /api/cart/:id : cập nhật số lượng sản phẩm trong giỏ hàng dựa trên id
* DELETE /api/cart/:id : xóa sản phẩm khỏi giỏ hàng dựa trên id

## Supplier API
* GET /api/supplier: trả về tất cả nhà cung cấp trong database
* GET /api/supplier/:id : trả về một nhà cung cấp dựa trên id
* POST /api/supplier: thêm một nhà cung cấp mới
* PUT /api/supplier/:id : cập nhật thông tin nhà cung cấp dựa trên id
* DELETE /api/supplier/:id : xóa một nhà cung cấp dựa trên id

## Goods received note API
* GET /api/goods-received-note: trả về tất cả phiếu nhập kho trong database
* GET /api/goods-received-note/:id : trả về một phiếu nhập kho dựa trên id
* POST /api/goods-received-note: thêm một phiếu nhập kho mới
* PUT /api/goods-received-note/:id : cập nhật thông tin phiếu nhập kho dựa trên id
* DELETE /api/goods-received-note/:id : xóa một phiếu nhập kho dựa trên id

## Order API
* GET /api/order: trả về tất cả đơn hàng trong database
* GET /api/order/:id : trả về một đơn hàng dựa trên id
* GET /api/order/by-user : trả về tất cả đơn hàng của user đang đăng nhập
* POST /api/order: thêm một đơn hàng mới
* PUT /api/order/status/:id : cập nhật trạng thái đơn hàng dựa trên id
* PUT /api/order/address/:id : cập nhật địa chỉ đơn hàng dựa trên id
* PUT /api/order/cash/:id : cập nhật trạng thái chưa thanh toán sang đã thanh toán dựa trên id

## Payment API
* GET /api/payment/vnp_ipn: kiểm tra thông tin thanh toán không bị thay đổi, được sử dụng để trao đổi giữa server với VNPAY sau khi website được deloy
* POSt /api/payment/create-vnp-url: tạo url thanh toán VNPAY
