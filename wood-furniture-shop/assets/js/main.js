// main.js - Xử lý logic riêng cho trang chủ

document.addEventListener("DOMContentLoaded", async () => {
  await renderCategories();
  await renderFeaturedProducts();
});

// Hiển thị danh mục
async function renderCategories() {
  const container = document.getElementById("categories-grid");
  if (!container) return;

  const categories = await fetchCategories();
  
  if (categories.length === 0) {
    container.innerHTML = "<p>Không có danh mục nào.</p>";
    return;
  }

  let html = "";
  categories.forEach(cat => {
    // Dùng ảnh dummy nếu không có
    const imgSrc = cat.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80";
    html += `
      <div class="category-card" onclick="window.location.href='products.html?category=${cat.id}'">
        <img src="${imgSrc}" alt="${cat.name}">
        <div class="category-overlay">
          <h3>${cat.name}</h3>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Hiển thị sản phẩm nổi bật
async function renderFeaturedProducts() {
  const container = document.getElementById("featured-products-grid");
  if (!container) return;

  const products = await fetchProducts();
  const categories = await fetchCategories();
  
  // Lọc sản phẩm nổi bật
  const featured = products.filter(p => p.featured).slice(0, 6); // Lấy tối đa 6 sản phẩm
  
  if (featured.length === 0) {
    container.innerHTML = "<p>Không có sản phẩm nổi bật nào.</p>";
    return;
  }

  let html = "";
  featured.forEach(product => {
    // Lấy tên danh mục
    const cat = categories.find(c => c.id === product.categoryId);
    const catName = cat ? cat.name : "Nội thất";
    const priceStr = formatCurrency(product.price);

    html += `
      <div class="product-card">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-img">
        </a>
        <div class="product-info">
          <span class="product-category">${catName}</span>
          <a href="product-detail.html?id=${product.id}">
            <h3 class="product-title">${product.name}</h3>
          </a>
          <div class="product-price">${priceStr}</div>
          <button class="btn-add-cart" onclick="addToCart('${product.id}')">Thêm vào giỏ</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
