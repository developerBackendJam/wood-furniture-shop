# Hướng dẫn Thiết kế UI (UI Guide)

## 1. Màu sắc chủ đạo (Colors)
- **Màu nền tối (Primary Dark):** `#1F1F1F` (Sử dụng cho nền Header, Footer, hoặc Dark mode).
- **Màu nhấn (Accent/Wood):** `#8B5A2B` (Màu gỗ nâu, dùng cho nút bấm, viền, icon nổi bật).
- **Màu nền sáng (Background):** `#F9F9F9` hoặc `#FFFFFF` (Cho thân trang).
- **Màu chữ chính (Text):** `#333333` (Trên nền sáng) và `#FFFFFF` (Trên nền tối).

## 2. Kiểu chữ (Typography)
- Sử dụng Google Fonts: **Inter** hoặc **Roboto**.
- Tiêu đề (H1, H2, H3): Cỡ chữ lớn, font-weight 600-700.
- Nội dung (Body): Cỡ chữ 16px, font-weight 400.

## 3. Khoảng cách & Bố cục (Spacing & Layout)
- Sử dụng Flexbox để dàn trang.
- Container giới hạn chiều rộng tối đa (max-width): `1200px` ở Desktop.
- Padding chung cho các section: `60px 20px`.
- Gap giữa các phần tử trong lưới: `24px`.

## 4. Hiệu ứng (Hover & Animations)
- **Buttons:** Đổi màu nền, thêm hiệu ứng bóng đổ (box-shadow), transition 0.3s.
- **Thẻ sản phẩm (Product Cards):** Phóng to nhẹ (scale 1.02) hoặc hiển thị nút "Thêm vào giỏ hàng" khi di chuột.
