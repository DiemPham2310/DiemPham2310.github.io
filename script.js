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
    cart.forEach(item => {
      const div = document.createElement("div");
      div.textContent = `${item.name} - SL: ${item.quantity}`;
      cartContainer.appendChild(div);
    });
  }
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

