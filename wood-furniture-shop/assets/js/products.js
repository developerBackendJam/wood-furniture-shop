// products.js - Logic hiển thị và lọc danh mục sản phẩm

let allProducts = [];
let allCategories = [];

document.addEventListener("DOMContentLoaded", async () => {
  allProducts = await fetchProducts();
  allCategories = await fetchCategories();
  
  renderCategoryFilter();
  
  // Xử lý tham số URL (nếu nhấp từ trang chủ vào 1 danh mục)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    document.querySelector(`[data-id="all"]`).classList.remove('active');
    const targetLink = document.querySelector(`[data-id="${categoryParam}"]`);
    if(targetLink) targetLink.classList.add('active');
  }

  renderCatalog();

  // Đăng ký sự kiện filter/sort
  document.getElementById('search-input').addEventListener('input', renderCatalog);
  document.getElementById('price-filter').addEventListener('change', renderCatalog);
  document.getElementById('sort-filter').addEventListener('change', renderCatalog);
});

function renderCategoryFilter() {
  const ul = document.getElementById("category-filter");
  if (!ul) return;
  
  let html = `<li><a href="#" class="active cat-link" data-id="all">Tất cả</a></li>`;
  allCategories.forEach(cat => {
    html += `<li><a href="#" class="cat-link" data-id="${cat.id}">${cat.name}</a></li>`;
  });
  ul.innerHTML = html;

  // Lắng nghe sự kiện click
  const links = ul.querySelectorAll('.cat-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      renderCatalog();
    });
  });
}

function renderCatalog() {
  const container = document.getElementById("catalog-grid");
  const countEl = document.getElementById("product-count");
  if (!container) return;

  // 1. Lấy giá trị bộ lọc
  const activeCat = document.querySelector('.cat-link.active').getAttribute('data-id');
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const priceRange = document.getElementById('price-filter').value;
  const sortType = document.getElementById('sort-filter').value;

  // 2. Lọc dữ liệu
  let filtered = allProducts.filter(p => {
    // Lọc theo danh mục
    if (activeCat !== 'all' && p.categoryId !== activeCat) return false;
    
    // Lọc theo tìm kiếm
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm)) return false;
    
    // Lọc theo giá
    if (priceRange === 'under10' && p.price >= 10000000) return false;
    if (priceRange === '10to20' && (p.price < 10000000 || p.price > 20000000)) return false;
    if (priceRange === 'over20' && p.price <= 20000000) return false;

    return true;
  });

  // 3. Sắp xếp dữ liệu
  if (sortType === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortType === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  // 4. Render UI
  countEl.textContent = `Hiển thị ${filtered.length} sản phẩm`;

  if (filtered.length === 0) {
    container.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>";
    return;
  }

  let html = "";
  filtered.forEach(product => {
    const cat = allCategories.find(c => c.id === product.categoryId);
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
