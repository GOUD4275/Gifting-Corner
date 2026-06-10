let allProducts = [];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

fetch("data/products.json")
.then(res => res.json())
.then(data => {

    allProducts = data;

    displayProducts(data);

    updateCartCount();

});

function displayProducts(products){

    const container =
    document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">₹${product.price}</p>

                <button
                class="wishlist-btn"
                onclick="addToWishlist(${product.id})">
                ❤️ Wishlist
                </button>

                <button
                class="cart-btn"
                onclick="addToCart(${product.id})">
                🛒 Add To Cart
                </button>

                <br><br>

                <a
                class="order-btn"
                target="_blank"
                href="https://wa.me/919966927212?text=Hi%20I%20want%20to%20order%20${product.name}">
                Order on WhatsApp
                </a>

            </div>

        </div>

        `;

    });

}

function addToCart(id){

    const product =
    allProducts.find(
        p => p.id === id
    );

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(product.name + " added to cart!");
}

function addToWishlist(id){

    const product =
    allProducts.find(
        p => p.id === id
    );

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(product.name + " added to wishlist!");
}

function updateCartCount(){

    const count =
    document.getElementById("cart-count");

    if(count){

        count.innerText =
        cart.length;

    }

}

function filterCategory(category){

    if(category === "All"){

        displayProducts(allProducts);

        return;

    }

    displayProducts(

        allProducts.filter(

            p => p.category === category

        )

    );

}

document
.getElementById("search")
.addEventListener("input", e => {

    const value =
    e.target.value.toLowerCase();

    displayProducts(

        allProducts.filter(product =>

            product.name
            .toLowerCase()
            .includes(value)

        )

    );

});