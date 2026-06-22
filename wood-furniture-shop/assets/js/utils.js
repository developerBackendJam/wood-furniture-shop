// utils.js - Các hàm dùng chung

// Hàm tải component (Header, Footer)
async function loadComponents() {
  try {
    const headerEl = document.getElementById('header-container');
    const footerEl = document.getElementById('footer-container');

    if (headerEl) {
      const resHeader = await fetch('../components/header.html');
      if (resHeader.ok) {
        headerEl.innerHTML = await resHeader.text();
      }
    }

    if (footerEl) {
      const resFooter = await fetch('../components/footer.html');
      if (resFooter.ok) {
        footerEl.innerHTML = await resFooter.text();
      }
    }

    // Cập nhật số lượng giỏ hàng sau khi tải xong header
    updateCartBadge();
    setActiveNav();
  } catch (error) {
    console.error("Lỗi khi tải component:", error);
  }
}

// Cập nhật trạng thái active cho menu
function setActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath.endsWith('/') && linkPath.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });
}

// Fetch dữ liệu sản phẩm
async function fetchProducts() {
  try {
    const res = await fetch('../database/products.json');
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    return [];
  }
}

// Fetch dữ liệu danh mục
async function fetchCategories() {
  try {
    const res = await fetch('../database/categories.json');
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi tải danh mục:", error);
    return [];
  }
}

// Định dạng tiền tệ VNĐ
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// --- QUẢN LÝ GIỎ HÀNG (LOCAL STORAGE) ---

// Lấy giỏ hàng hiện tại
function getCart() {
  const cart = localStorage.getItem('wood_shop_cart');
  return cart ? JSON.parse(cart) : [];
}

// Lưu giỏ hàng
function saveCart(cart) {
  localStorage.setItem('wood_shop_cart', JSON.stringify(cart));
  updateCartBadge();
}

// Cập nhật số lượng trên icon giỏ hàng ở header
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }
}

// Thêm sản phẩm vào giỏ
function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveCart(cart);
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Khởi chạy khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
});
