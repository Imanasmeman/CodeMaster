// Function to get the category from the URL query parameter "cat"
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("cat"); // Get the 'cat' parameter
}

// Display the category title on the page
const category = getCategoryFromURL();
const categoryTitleElement = document.getElementById("categoryTitle");
if (categoryTitleElement) {
    categoryTitleElement.innerText = category ? category : "All Products";
}

let products = [];

// Fetch data from Firebase Realtime Database
fetch('https://codemaster-20c2a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
    .then(response => response.json())
    .then(data => {
        if (!data) {
            console.error("No products found in the database.");
            return;
        }

        products = Object.values(data); // Convert Firebase object into an array
        displayProducts();
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        const container = document.getElementById("productsContainer");
        if (container) {
            container.innerHTML = `<p>Error loading products. Please try again later.</p>`;
        }
    });

function displayProducts(filteredProducts = products) {
    const container = document.getElementById("productsContainer");
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    // Filter products based on the category from URL
    let finalProducts = category 
        ? filteredProducts.filter(product => product.category?.toLowerCase() === category.toLowerCase()) 
        : filteredProducts;

    if (finalProducts.length === 0) {
        container.innerHTML = `<p>No products found.</p>`;
        return;
    }

    // Loop through products and display them
    finalProducts.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("productCard");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p><strong>Price:</strong> ₹${product.price.current} 
                <br><small><del>₹${product.price.original}</del> | ${product.price.discount} off</small>
            </p>
            <p>${product.color ? `<strong>Color:</strong> ${product.color}` : ''} 
               ${product.storage ? `| <strong>Storage:</strong> ${product.storage}` : ''} 
               ${product.ram ? `| <strong>RAM:</strong> ${product.ram}` : ''}</p>
        `;
        container.appendChild(card);
    });
}

// Search functionality
function searchProducts() {
    const query = document.getElementById("searchBar")?.value.toLowerCase();
    if (!query) return;

    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
}

// Sort functionality
function sortProducts(order) {
    let sortedProducts = [...products];

    if (category) {
        sortedProducts = sortedProducts.filter(product => product.category?.toLowerCase() === category.toLowerCase());
    }

    if (order === 'lowToHigh') {
        sortedProducts.sort((a, b) => a.price.current - b.price.current);
    } else if (order === 'highToLow') {
        sortedProducts.sort((a, b) => b.price.current - a.price.current);
    }

    displayProducts(sortedProducts);
}
