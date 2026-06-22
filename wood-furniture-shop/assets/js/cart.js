// cart.js - Quản lý giỏ hàng

document.addEventListener("DOMContentLoaded", async () => {
  renderCart();
});

async function renderCart() {
  const cart = getCart();
  const emptyMsg = document.getElementById("cart-empty-message");
  const layout = document.getElementById("cart-layout");

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    layout.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  layout.style.display = "flex";

  const products = await fetchProducts();
  const tbody = document.getElementById("cart-tbody");
  let html = "";
  let subtotal = 0;

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    if (!product) return; // Bỏ qua nếu không có thông tin sản phẩm

    const itemTotal = product.price * cartItem.quantity;
    subtotal += itemTotal;

    html += `
      <tr>
        <td>
          <div class="cart-product-info">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
          </div>
        </td>
        <td style="font-weight: 600;">${formatCurrency(product.price)}</td>
        <td>
          <div class="qty-control">
            <button onclick="updateQty('${product.id}', -1)">-</button>
            <input type="text" value="${cartItem.quantity}" readonly>
            <button onclick="updateQty('${product.id}', 1)">+</button>
          </div>
        </td>
        <td style="color: var(--accent-color); font-weight: 700;">${formatCurrency(itemTotal)}</td>
        <td>
          <button class="btn-remove" onclick="removeItem('${product.id}')">Xóa</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  
  // Cập nhật tóm tắt
  document.getElementById("subtotal").textContent = formatCurrency(subtotal);
  document.getElementById("total").textContent = formatCurrency(subtotal);
}

function updateQty(productId, change) {
  let cart = getCart();
  const itemIndex = cart.findIndex(i => i.productId === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1); // Xóa nếu <= 0
    }
    saveCart(cart);
    renderCart();
  }
}

function removeItem(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.productId !== productId);
  saveCart(cart);
  renderCart();
}
