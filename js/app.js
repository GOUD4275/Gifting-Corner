let allProducts = [];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

// Load Products

fetch("data/products.json")
.then(response => response.json())
.then(data => {

    allProducts = data;

    displayProducts(allProducts);

    updateCartCount();

})
.catch(error => {

    console.log("Error loading products:", error);

});

// Display Products

function displayProducts(products){

    const container =
    document.getElementById("products");

    if(!container) return;

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
                onclick="addToWishlist(${product.id})">
                ❤️ Wishlist
                </button>

                <button
                onclick="addToCart(${product.id})">
                🛒 Add To Cart
                </button>

                <br><br>

                <a
                class="order-btn"
                target="_blank"
                href="https://wa.me/919966927212?text=Hi I want to order ${product.name}">
                Order on WhatsApp
                </a>

            </div>

        </div>

        `;

    });

}

// Add To Cart

function addToCart(id){

    const product =
    allProducts.find(
        p => p.id === id
    );

    if(!product) return;

    const existing =
    cart.find(
        p => p.id === id
    );

    if(existing){

        existing.qty =
        (existing.qty || 1) + 1;

    }else{

        cart.push({

            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            qty: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(product.name + " added to cart!");

}

// Add To Wishlist

function addToWishlist(id){

    const product =
    allProducts.find(
        p => p.id === id
    );

    if(!product) return;

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(product.name + " added to wishlist!");

}

// Cart Count

function updateCartCount(){

    const count =
    document.getElementById("cart-count");

    if(count){

        let totalItems = 0;

        cart.forEach(item => {

            totalItems +=
            item.qty || 1;

        });

        count.innerText =
        totalItems;

    }

}

// Category Filter

function filterCategory(category){

    if(category === "All"){

        displayProducts(allProducts);

        return;

    }

    const filteredProducts =

    allProducts.filter(product =>

        product.category === category

    );

    displayProducts(filteredProducts);

}

// Search

const searchBox =
document.getElementById("search");

if(searchBox){

    searchBox.addEventListener("input", function(e){

        const value =
        e.target.value.toLowerCase();

        const filteredProducts =

        allProducts.filter(product =>

            product.name
            .toLowerCase()
            .includes(value)

        );

        displayProducts(filteredProducts);

    });

}