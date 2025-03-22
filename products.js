// Function to get the category from the URL query parameter "cat"
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("cat"); // Get the 'cat' parameter
}

// Display the category title on the page
const category = getCategoryFromURL();
document.getElementById("categoryTitle").innerText = category 
    ? `Showing results for: ${category}` 
    : "No category selected";

// Fetch data from Firebase Realtime Database
fetch('https://codemaster-20c2a-default-rtdb.asia-southeast1.firebasedatabase.app/.json')
    .then(response => response.json())
    .then(data => {
        if (!data || !data.products) {
            console.error("No products found in the database.");
            return;
        }

        let products = Object.values(data.products); // Convert Firebase object into an array
        let container = document.getElementById("productsContainer");
        container.innerHTML = ""; // Clear previous content

        // Filter products based on the category from URL
        let filteredProducts = category 
            ? products.filter(product => product.category.toLowerCase() === category.toLowerCase()) 
            : products;

        if (filteredProducts.length === 0) {
            container.innerHTML = `<p>No products found for this category.</p>`;
            return;
        }

        // Loop through filtered products and display them
        filteredProducts.forEach(product => {
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
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById("productsContainer").innerHTML = `<p>Error loading products. Please try again later.</p>`;
    });
