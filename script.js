// Hiển thị giá sản phẩm khi chọn từ danh mục
function showPrice(name, price) {
  document.getElementById("productPrice").textContent = `${name}: ${price}`;
}

// Gửi tin nhắn đặt hàng
function sendMessage() {
  const message = document.getElementById("message").value.trim();
  const response = document.getElementById("chatResponse");

  if (!message) {
    response.style.color = "red";
    response.textContent = "Vui lòng nhập nội dung tin nhắn!";
    return;
  }

  const url = "https://script.google.com/macros/s/AKfycbzqJQZPddWOGcHHLpdMPxRXD17CyyUFLA1DeeiOLKrRP0qeRGqLicqtu2Z4rKaMzDLa/exec";

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
  // Thêm sản phẩm khác tại đây nếu muốn
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

// Cập nhật hiển thị số lượng còn lại
function updateProductDisplay() {
  products.forEach(product => {
    const stockElement = document.getElementById(`stock-${product.id}`);
    if (stockElement) {
      stockElement.textContent = `Còn lại: ${product.stock} sản phẩm`;
    }
  });
}

// Cập nhật hiển thị giỏ hàng
function updateCartDisplay() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Giỏ hàng đang trống.</p>";
  } else {
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemDiv = document.createElement("div");
      itemDiv.style.marginBottom = "5px";

      itemDiv.innerHTML = `
        ${item.name} - SL: ${item.quantity} - Thành tiền: ${itemTotal.toLocaleString()} VNĐ
        <button style="margin-left:10px" onclick="removeFromCart(${item.id})">🗑️ Xóa</button>
      `;

      cartContainer.appendChild(itemDiv);
    });

    const totalDiv = document.createElement("div");
    totalDiv.style.fontWeight = "bold";
    totalDiv.style.marginTop = "10px";
    totalDiv.style.color = "#d32f2f";
    totalDiv.textContent = `🧾 Tổng tiền: ${total.toLocaleString()} VNĐ`;
    cartContainer.appendChild(totalDiv);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "🔄 Làm mới giỏ hàng";
    clearBtn.style.marginTop = "10px";
    clearBtn.style.backgroundColor = "#d32f2f";
    clearBtn.style.color = "#fff";
    clearBtn.style.padding = "8px 12px";
    clearBtn.style.border = "none";
    clearBtn.style.borderRadius = "5px";
    clearBtn.style.cursor = "pointer";
    clearBtn.onclick = clearCart;
    cartContainer.appendChild(clearBtn);
  }
}
// Xóa từng sản phẩm khỏi giỏ
function removeFromCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItemIndex = cart.findIndex(item => item.id === productId);

  if (cartItemIndex !== -1) {
    const removedItem = cart[cartItemIndex];
    product.stock += removedItem.quantity;
    cart.splice(cartItemIndex, 1);
    updateProductDisplay();
    updateCartDisplay();
  }
}

// Làm mới toàn bộ giỏ hàng
function clearCart() {
  // Trả lại số lượng sản phẩm
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      product.stock += item.quantity;
    }
  });

  cart = [];
  updateProductDisplay();
  updateCartDisplay();
}

// Khi trang được tải xong
document.addEventListener("DOMContentLoaded", function () {
  updateProductDisplay();

  // Gán sự kiện cho các nút "Thêm vào giỏ"
  document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const productCard = btn.closest(".product-card");
      const productName = productCard.querySelector(".product-name").innerText;
      alert(`Đã thêm "${productName}" vào giỏ hàng!`);
    });
  });

  // Gán sự kiện click cho danh mục
  document.querySelectorAll("nav ul li a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert(`Bạn đã chọn danh mục: ${link.innerText}`);
    });
  });
});


