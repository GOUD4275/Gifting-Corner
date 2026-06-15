let allProducts = [];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

fetch("data/products.json")
.then(res => res.json())
.then(data => {

```
allProducts = data;

displayProducts(data);

updateCartCount();
```

});

function displayProducts(products){

```
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

            <button onclick="addToWishlist(${product.id})">
            ❤️ Wishlist
            </button>

            <button onclick="addToCart(${product.id})">
            🛒 Add To Cart
            </button>

        </div>

    </div>

    `;

});
```

}

function addToCart(id){

```
const product =
allProducts.find(p => p.id === id);

const existing =
cart.find(p => p.id === id);

if(existing){

    existing.qty =
    (existing.qty || 1) + 1;

}else{

    cart.push({
        ...product,
        qty:1
    });

}

localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);

updateCartCount();

alert(product.name + " added to cart!");
```

}

function addToWishlist(id){

```
const product =
allProducts.find(p => p.id === id);

wishlist.push(product);

localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
);

alert(product.name + " added to wishlist!");
```

}

function updateCartCount(){

```
const count =
document.getElementById("cart-count");

if(count){

    count.innerText =
    cart.reduce((sum,item)=>
    sum + (item.qty || 1),0);

}
```

}

function filterCategory(category){

```
if(category==="All"){

    displayProducts(allProducts);

    return;

}

displayProducts(

    allProducts.filter(

        p => p.category === category

    )

);
```

}

const searchBox =
document.getElementById("search");

if(searchBox){

searchBox.addEventListener("input", e => {

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

}
