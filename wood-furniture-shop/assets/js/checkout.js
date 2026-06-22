// checkout.js - Xử lý thanh toán

document.addEventListener("DOMContentLoaded", async () => {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống! Đang chuyển về trang chủ...");
    window.location.href = "index.html";
    return;
  }

  const products = await fetchProducts();
  const listContainer = document.getElementById("checkout-items");
  let total = 0;
  let html = "";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      html += `
        <div class="checkout-item">
          <div class="checkout-item-name">${product.name} <strong>x${item.quantity}</strong></div>
          <div class="checkout-item-price">${formatCurrency(itemTotal)}</div>
        </div>
      `;
    }
  });

  listContainer.innerHTML = html;
  document.getElementById("checkout-total").textContent = formatCurrency(total);

  // Xử lý submit form
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Thu thập data (nếu có backend thì gửi lên đây)
    const orderData = {
      fullname: document.getElementById('fullname').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      items: cart,
      total: total
    };

    console.log("Đơn hàng mới:", orderData);
    
    alert("Cảm ơn bạn! Đơn hàng của bạn đã được tiếp nhận thành công.");
    
    // Xóa giỏ hàng và chuyển về trang chủ
    localStorage.removeItem("wood_shop_cart");
    window.location.href = "index.html";
  });
});
