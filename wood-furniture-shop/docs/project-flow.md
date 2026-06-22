# Luồng hoạt động (Project Flow)

## 1. Khởi tạo
- Khi tải mọi trang, file `utils.js` sẽ chạy hàm `loadComponents()` để tải `header.html` và `footer.html`.
- File `utils.js` cũng chịu trách nhiệm đếm số lượng item trong `localStorage` và cập nhật biểu tượng giỏ hàng trên Header.

## 2. Trang chủ -> Chi tiết sản phẩm
- Tại Trang chủ (`index.html`), `main.js` tải danh sách danh mục và các sản phẩm đánh dấu `featured = true`.
- Khi nhấp vào sản phẩm, chuyển hướng sang `product-detail.html?id=[ID_SẢN_PHẨM]`.

## 3. Danh sách sản phẩm -> Giỏ hàng
- Trang `products.html` hiển thị lưới sản phẩm.
- Nhấp "Thêm vào giỏ hàng", `utils.js` (hàm `addToCart`) lưu vào `localStorage`.

## 4. Thanh toán
- Tại giỏ hàng (`cart.html`), người dùng xác nhận số lượng và bấm "Tiến hành thanh toán".
- Chuyển tới `checkout.html`, nhập thông tin và xác nhận "Đặt hàng". Giỏ hàng sẽ được xóa khỏi `localStorage` sau khi thành công.
