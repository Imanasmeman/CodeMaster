


function handleSearch(event) {
    if (event.key === "Enter") {
      redirectToSearch();
    }
  }

  function redirectToSearch() {
    let searchQuery = document.getElementById("searchInput").value.trim();
    if (searchQuery) {
      window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
    }
  }

function redirectToCategory(category) {
    window.location.href = `category.html?category=${category}`;
}

function redirectToProduct(productId) {
    window.location.href = `product.html?product=${productId}`;
}


function loginpage() {
    // Simulate login success
    window.location.href = 'login.html';
}
function seller() {

     window.location.href = 'https://seller.flipkart.com/sell-online?utm_source=fkwebsite&utm_medium=websitedirect';
}

function alertf(){
  alert("will be availble soon")
}