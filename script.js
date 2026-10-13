
"use strict";

// Sample dataset
const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 55000, inStock: true },
    { id: 2, name: "Headphones", category: "Electronics", price: 2500, inStock: true },
    { id: 3, name: "Notebook", category: "Stationery", price: 100, inStock: false },
    { id: 4, name: "Keyboard", category: "Electronics", price: 1800, inStock: true },
    { id: 5, name: "Pen", category: "Stationery", price: 30, inStock: true }
];

// 1. Arrow function
const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

// 2. Array destructuring
const [firstProduct, secondProduct] = products;

console.log("First product:", firstProduct.name);
console.log("Second product:", secondProduct.name);

// 3. Object destructuring
const { name, price } = firstProduct;
console.log(`${name} costs ${formatPrice(price)}`);

// 4. filter(): find products currently in stock
const availableProducts = products.filter(
    ({ inStock }) => inStock
);

// 5. map(): get product names
const productNames = products.map(
    ({ name }) => name
);

// 6. reduce(): calculate the total price
const totalPrice = products.reduce(
    (total, { price }) => total + price,
    0
);

console.log("Available products:", availableProducts);
console.log("Product names:", productNames);
console.log("Total inventory value:", formatPrice(totalPrice));

// 7. Display products on the webpage
const productList = document.querySelector("#product-list");
const totalElement = document.querySelector("#total");
const filterButton = document.querySelector("#filter-button");
const countElement = document.querySelector("#count");

let showAvailableOnly = false;

const renderProducts = () => {
    const visibleProducts = showAvailableOnly
        ? products.filter(({ inStock }) => inStock)
        : products;

    productList.innerHTML = visibleProducts.map(
        ({ name, category, price, inStock }) => `
            <article class="product-card">
                <h3>${name}</h3>
                <p>Category: ${category}</p>
                <p>Price: ${formatPrice(price)}</p>
                <p class="${inStock ? "available" : "unavailable"}">
                    ${inStock ? "In stock" : "Out of stock"}
                </p>
            </article>
        `
    ).join("");

    countElement.textContent =
        `${visibleProducts.length} product(s) displayed`;

    totalElement.textContent = formatPrice(
        visibleProducts.reduce((sum, product) => sum + product.price, 0)
    );

    filterButton.textContent = showAvailableOnly
        ? "Show All Products"
        : "Show In-Stock Products";
};

// 8. Event listener: filter products when clicked
filterButton.addEventListener("click", () => {
    showAvailableOnly = !showAvailableOnly;
    renderProducts();
});

// Initial render
renderProducts();
