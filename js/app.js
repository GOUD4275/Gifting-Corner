let allProducts = [];

fetch("data/products.json")
.then(res => res.json())
.then(data => {
allProducts = data;
displayProducts(data);
});

function displayProducts(products){

const container =
document.getElementById("products");

container.innerHTML = "";

products.forEach(product => {

container.innerHTML += `

<div class="card">

<img src="${product.image}">

<div class="card-content">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p class="price">₹${product.price}</p>

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

function filterCategory(category){

if(category==="All"){
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
product.name.toLowerCase()
.includes(value)
)
);

});