# Cấu trúc dữ liệu (Database Schema)

Dữ liệu được lưu trong các file `.json`.

## 1. products.json
Chứa mảng các object sản phẩm:
```json
[
  {
    "id": "p1",
    "name": "Ghế Sofa Gỗ Sồi",
    "price": 15000000,
    "categoryId": "c1",
    "image": "../assets/images/sofa-go-soi.jpg",
    "description": "Sofa gỗ sồi tự nhiên, thiết kế tối giản...",
    "material": "Gỗ sồi",
    "dimensions": "200cm x 80cm",
    "featured": true,
    "stock": 10
  }
]
```

## 2. categories.json
Chứa danh mục sản phẩm:
```json
[
  {
    "id": "c1",
    "name": "Phòng khách",
    "image": "../assets/images/cat-living.jpg"
  }
]
```
