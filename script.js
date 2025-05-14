
    function showPrice(name, price) {
      document.getElementById("productPrice").textContent = name + ": " + price;
    }

    function sendMessage() {
      const message = document.getElementById("message").value.trim();
      const response = document.getElementById("chatResponse");

      if (message === "") {
        response.style.color = "red";
        response.textContent = "Vui lòng nhập nội dung tin nhắn!";
        return;
      }

      // 👉 Thay URL dưới đây bằng webhook của bạn từ Google Apps Script
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
function showPrice(name, price) {
      document.getElementById("productPrice").textContent = name + ": " + price;
    }

    function sendMessage() {
      const message = document.getElementById("message").value.trim();
      const response = document.getElementById("chatResponse");

      if (message === "") {
        response.style.color = "red";
        response.textContent = "Vui lòng nhập nội dung tin nhắn!";
        return;
      }

      // 👉 Thay URL dưới đây bằng webhook của bạn từ Google Apps Script
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

  // Danh sách sản phẩm (mỗi sản phẩm nên có ID riêng để tiện quản lý)
  const products = [
    {
      id: 1,
      name: "Mắm Cá Sơn",
      price: 100000,
      stock: 20
    },
    {
      id: 2,
      name: "Mật Ong rừng (Ong mật)",
      price: 450000,
      stock: 10
    },
    // Thêm sản phẩm khác tại đây...
  ];

  // Giỏ hàng tạm thời
  let cart = [];

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock > 0) {
      // Trừ số lượng
      product.stock -= 1;

      // Kiểm tra sản phẩm đã có trong giỏ chưa
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      // Cập nhật giao diện
      updateProductDisplay();
      updateCartDisplay();
    } else {
      alert("Sản phẩm đã hết hàng!");
    }
  }

  function updateProductDisplay() {
    products.forEach(product => {
      const stockElement = document.getElementById(stock-${product.id});
      if (stockElement) {
        stockElement.textContent = Còn lại: ${product.stock};
      }
    });
  }

  function updateCartDisplay() {
    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    } else {
      cart.forEach(item => {
        const div = document.createElement("div");
        div.textContent = ${item.name} - SL: ${item.quantity};
        cartContainer.appendChild(div);
      });
    }
  }

  // Khởi tạo sản phẩm khi load trang
  document.addEventListener("DOMContentLoaded", () => {
    updateProductDisplay();
  });
  function showPrice(productName, price) {
    document.getElementById("productPrice").innerHTML = productName + ": " + price;
  }