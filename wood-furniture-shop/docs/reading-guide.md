# 📖 Hướng Dẫn Đọc Dự Án

Tài liệu này hướng dẫn thứ tự đọc file để hiểu toàn bộ dự án **Wood Furniture Shop** từ tổng quan đến chi tiết.

---

## Bước 1 — Hiểu Tổng Quan & Yêu Cầu (`docs/`)

Đọc tài liệu trước để nắm bức tranh toàn cảnh trước khi đụng vào code.

| Thứ tự | File | Mục đích |
|--------|------|----------|
| 1 | `docs/README.md` | Giới thiệu dự án, mục tiêu chung |
| 2 | `docs/requirements.md` | Danh sách tính năng cần có |
| 3 | `docs/project-flow.md` | Luồng hoạt động của các trang |
| 4 | `docs/ui-guide.md` | Hướng dẫn giao diện, màu sắc, font chữ |
| 5 | `docs/database.md` | Cấu trúc dữ liệu sản phẩm |

---

## Bước 2 — Hiểu Dữ Liệu (`database/`)

Xem dữ liệu thực tế để biết cấu trúc object mà JS sẽ xử lý.

| Thứ tự | File | Mục đích |
|--------|------|----------|
| 6 | `database/categories.json` | Danh sách danh mục sản phẩm |
| 7 | `database/products.json` | Toàn bộ dữ liệu sản phẩm |

---

## Bước 3 — Hiểu Nền Tảng CSS & JS Dùng Chung

Đây là nền tảng của toàn bộ site — đọc trước khi xem trang bất kỳ.

| Thứ tự | File | Mục đích |
|--------|------|----------|
| 8 | `assets/css/main.css` | CSS gốc: biến màu, reset, typography, layout chung |
| 9 | `assets/js/utils.js` | Hàm tiện ích dùng chung: render component, xử lý cart, format tiền... |

---

## Bước 4 — Hiểu Component Tái Sử Dụng (`components/`)

Header và footer được inject vào tất cả các trang qua JS.

| Thứ tự | File | Mục đích |
|--------|------|----------|
| 10 | `components/header.html` | Thanh điều hướng chung |
| 11 | `components/footer.html` | Footer chung |

---

## Bước 5 — Đọc Từng Trang (HTML + CSS + JS)

Đọc theo cặp HTML → CSS → JS tương ứng của mỗi trang.

| Thứ tự | HTML | CSS | JS |
|--------|------|-----|----|
| 12 | `pages/index.html` | `assets/css/home.css` | `assets/js/main.js` |
| 13 | `pages/products.html` | `assets/css/products.css` | `assets/js/products.js` |
| 14 | `pages/product-detail.html` | `assets/css/products.css` | `assets/js/products.js` |
| 15 | `pages/cart.html` | `assets/css/cart.css` | `assets/js/cart.js` |
| 16 | `pages/checkout.html` | `assets/css/checkout.css` | `assets/js/checkout.js` |
| 17 | `pages/contact.html` | — | — |

---

## Bước 6 — Theo Dõi Tiến Độ

| File | Mục đích |
|------|----------|
| `progress.md` | Ghi lại tiến độ phát triển hiện tại của dự án |

---

> **Lưu ý:** Luôn đọc `utils.js` kỹ trước khi chỉnh sửa bất kỳ trang nào,
> vì hầu hết logic tái sử dụng (render card, giỏ hàng, inject header/footer) đều nằm ở đây.
