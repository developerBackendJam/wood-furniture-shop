
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

    updateCartBadge();
    setActiveNav();
  } catch (error) {
    console.error("Lỗi khi tải component:", error);
  }
}


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


async function fetchProducts() {
  try {

    const cached = localStorage.getItem('wood_shop_products');
    if (cached) {
      return JSON.parse(cached);
    }

    const res = await fetch('../database/products.json');
    if (!res.ok) throw new Error("Network response was not ok");
    const products = await res.json();
    localStorage.setItem('wood_shop_products', JSON.stringify(products));
    return products;
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    return [];
  }
}


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


function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getCart() {
  const cart = localStorage.getItem('wood_shop_cart');
  return cart ? JSON.parse(cart) : [];
}


function saveCart(cart) {
  localStorage.setItem('wood_shop_cart', JSON.stringify(cart));
  updateCartBadge();
}


function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }
}


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


document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
});
