let cart =
JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("cart-items")
.innerHTML =
`Items in Cart: ${cart.length}`;