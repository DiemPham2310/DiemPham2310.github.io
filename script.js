// Hiển thị giá sản phẩm khi chọn từ danh mục
function showPrice(name, price) {
  document.getElementById("productPrice").textContent = `${name}: ${price}`;
}

// Gửi tin nhắn đơn giản
function sendMessage() {
  const message = document.getElementById("message").value.trim();
  const response = document.getElementById("chatResponse");

  if (!message) {
    response.style.color = "red";
    response.textContent = "Vui lòng nhập nội dung tin nhắn!";
    return;
  }

  const url = "https://script.google.com/macros/s/AKfycbyLv7fX5WhnXrJTbV00iJ-kwDq7DpSYy_GoVDAUO4P8Yy9MRJWsJFVw_3FjpBgvImMK/exec";
  const formData = new FormData();
  formData.append("message", message);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      response.style.color = "green";
      response.textContent = "Tin nhắn đã được gửi và lưu thành công!";
      document.getElementById("message").value = "";
    })
    .catch(() => {
      response.style.color = "red";
      response.textContent = "Có lỗi xảy ra. Vui lòng thử lại sau!";
    });
}

// Danh sách sản phẩm
const products = [
  { id: 1, name: "Mắm Cá Sơn", price: 100000, stock: 20 },
  { id: 2, name: "Mật Ong rừng (Ong mật)", price: 450000, stock: 10 },
  { id: 3, name: "Đù bông", price: 165000, stock: 25 },
  { id: 4, name: "Khoai trung nhỏ", price: 300000, stock: 18 },
  { id: 5, name: "Khô Mối tẩm", price: 185000, stock: 16 },
];

// Giỏ hàng
let cart = [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock > 0) {
    product.stock--;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateProductDisplay();
    updateCartDisplay();
  } else {
    alert("Sản phẩm đã hết hàng!");
  }
}

// Cập nhật hiển thị tồn kho
function updateProductDisplay() {
  products.forEach(product => {
    const stockElement = document.getElementById(`stock-${product.id}`);
    if (stockElement) {
      stockElement.textContent = `Còn lại: ${product.stock} sản phẩm`;
    }
  });
}

// Cập nhật giỏ hàng
function updateCartDisplay() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  let content = "";

  if (cart.length === 0) {
    content += "<p>Giỏ hàng đang trống.</p>";
  } else {
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      content += `
        <div style="margin-bottom: 5px;">
          ${item.name} - SL: ${item.quantity} - Thành tiền: ${itemTotal.toLocaleString()} VNĐ
          <button onclick="removeFromCart(${item.id})">🗑️ Xóa</button>
        </div>
      `;
    });

    content += `<div style="font-weight:bold; margin-top:10px; color:#d32f2f;">
      🧾 Tổng tiền: ${total.toLocaleString()} VNĐ
    </div>`;
  }

  content += `
    <button onclick="clearCart()" style="margin-top: 10px; background-color: #4CAF50; color: #fff; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
      🔄 Làm mới giỏ hàng
    </button>

    <button onclick="showOrderForm()" style="margin-top: 10px; margin-left: 10px; background-color: #f57c00; color: #fff; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
      📦 Đặt hàng
    </button>

    <div id="orderForm" style="display:none; margin-top:20px; text-align:left;">
      <label>👤 Tên của Quý Khách:</label><br/>
      <input type="text" id="customerName" style="width:100%; padding:5px; margin-bottom:5px;"><br/>

      <label>📞 Số điện thoại:</label><br/>
      <input type="text" id="customerPhone" style="width:100%; padding:5px; margin-bottom:5px;"><br/>

      <label>📍 Địa chỉ:</label><br/>
      <input type="text" id="customerAddress" style="width:100%; padding:5px; margin-bottom:5px;"><br/>

      <label>📝 Ghi chú (tuỳ chọn):</label><br/>
      <textarea id="customerNote" style="width:100%; height:80px; padding:5px;"></textarea><br/>

      <button onclick="submitOrder()" style="margin-top:10px; background-color: #388e3c; color:#fff; padding:8px 16px; border:none; border-radius:5px;">
        ✅ Xác nhận Đặt hàng
      </button>

      <p id="orderStatus" style="margin-top:10px;"></p>
    </div>
  `;

  cartContainer.innerHTML = content;
}

// Xoá sản phẩm khỏi giỏ
function removeFromCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartIndex = cart.findIndex(item => item.id === productId);

  if (cartIndex !== -1) {
    const removedItem = cart[cartIndex];
    product.stock += removedItem.quantity;
    cart.splice(cartIndex, 1);
    updateProductDisplay();
    updateCartDisplay();
  }
}

// Làm mới giỏ hàng
function clearCart() {
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) product.stock += item.quantity;
  });
  cart = [];
  updateProductDisplay();
  updateCartDisplay();
}

// Hiện form đặt hàng
function showOrderForm() {
  document.getElementById("orderForm").style.display = "block";
}

// Gửi đơn hàng đến Google Sheets
function submitOrder() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const note = document.getElementById("customerNote").value.trim();
  const status = document.getElementById("orderStatus");

  if (!name || !phone || !address) {
    status.style.color = "red";
    status.textContent = "Vui lòng điền đầy đủ Tên, Số điện thoại và Địa chỉ!";
    return;
  }

  const orderDetails = cart.map(item => {
    const unit = item.name.toLowerCase().includes("mật ong") ? "lít" : "kg";
    const quantity = unit === "lít" ? item.quantity : item.quantity * 0.5;
    return `${item.name} - ${quantity} ${unit}`;
  }).join(" | ");

  const fullMessage = `
    Khách hàng: ${name}
    SĐT: ${phone}
    Địa chỉ: ${address}
    Sản phẩm: ${orderDetails}
    Ghi chú: ${note}
    Tổng tiền: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} VNĐ
  `.trim();

  const url = "https://script.google.com/macros/s/AKfycbzqJQZPddWOGcHHLpdMPxRXD17CyyUFLA1DeeiOLKrRP0qeRGqLicqtu2Z4rKaMzDLa/exec";
  const formData = new FormData();
  formData.append("message", fullMessage);

  fetch(url, {
    method: "POST",
    body: formData
  })
    .then(() => {
      clearCart();
      document.getElementById("orderForm").style.display = "none";
      showSuccessToast(); // 👈 Gọi popup nổi
    })

    .catch(() => {
      status.style.color = "red";
      status.textContent = "❌ Gửi đơn hàng thất bại. Vui lòng thử lại sau.";
    });
}

// Thông báo nhẹ khi thêm sản phẩm vào giỏ (thay cho alert)
function showNotification(message) {
  const note = document.getElementById("notification");
  if (note) {
    note.textContent = message;
    note.style.display = "block";
    setTimeout(() => {
      note.style.display = "none";
    }, 2000);
  }
}

// Khởi động sau khi trang đã load
document.addEventListener("DOMContentLoaded", function () {
  updateProductDisplay();

  document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const productCard = btn.closest(".product-card");
      const productName = productCard.querySelector(".product-name").innerText;
      showNotification(`Đã thêm "${productName}" vào giỏ hàng!`);
    });
  });
});
function showSuccessToast() {
  const toast = document.getElementById("successToast");
  if (toast) {
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000); // 3 giây
  }
}



