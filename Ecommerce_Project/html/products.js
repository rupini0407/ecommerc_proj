function fetchAndDisplayAllProducts() {
  const apiUrl = 'https://fakestoreapi.com/products';

  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
   
      renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
    updateCartSizeDisplay();
}

function displayMenClothing(){

  const apiUrl = 'https://fakestoreapi.com/products/category/men\'s clothing';
   console.log("mens clothing")
  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
     
      renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
    updateCartSizeDisplay();

    

}

function displayWomensClothing(){

  const apiUrl = 'https://fakestoreapi.com/products/category/women\'s clothing';
   console.log("womens clothing")
  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
     
      renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
    updateCartSizeDisplay();
}

function displayJewelery(){

  const apiUrl = 'https://fakestoreapi.com/products/category/jewelery';
   console.log("jewelery")
  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
     
      renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
    updateCartSizeDisplay();
}


function displayElectronics()
{
  const apiUrl = 'https://fakestoreapi.com/products/category/electronics';
   console.log("electronics")
  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
     
      renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
    updateCartSizeDisplay();
}


function renderProducts(products) {
  const container = document.getElementById('product-cards-container');
  container.innerHTML = ''; // Clear current cards

  products.forEach(product => {
    const cardHTML = `
      
        <div class="card" style="width:380px">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title.substring(0, 10).concat('-...')}</h5>
            <p class="card-text">${product.description.substring(0, 100)}...</p>
            <hr>
            <p class="price">$${product.price}</p>
            <hr>
            <span>
              <a href="#" class="btn btn-dark" id="details" onclick="viewDetails(${product.id})">Details</a>
              <!-- Using data-* attributes to pass title, price, and image -->
              <a class="btn btn-dark" 
                 data-title="${product.title}" 
                 data-price="${product.price}" 
                 data-image="${product.image}" 
                 onclick="addToCart(${product.id}, this)">Add to Cart</a>
            </span>
          </div>
        </div>
    
    `;
    container.innerHTML += cardHTML;
  });
}




function addToCart(id, element) {
  // Get the title, price, and image from the data-* attributes of the clicked element
  const title = element.getAttribute('data-title');
  const price = element.getAttribute('data-price');
  const image = element.getAttribute('data-image');

  // Create a cart item
  const product = {
    id,
    title,
    price,
    image,
    quantity: 1,
  };

  // Fetch the existing cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  const productIndex = cart.findIndex(item => item.id === id);
  if (productIndex > -1) {
    // If product exists, increment the quantity
    cart[productIndex].quantity += 1;
  } else {
    // Otherwise, add the product to the cart
    cart.push(product);
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart size display
  updateCartSizeDisplay();

  // Notify other pages using a storage key
  localStorage.setItem('cartUpdated', JSON.stringify({ time: Date.now() }));
}




function updateCartSizeDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartSize = cart.length; 
  
  const numberDisplay = document.getElementById("cartSize");
  if (numberDisplay) {
    numberDisplay.textContent = cartSize;
  }
}

window.addEventListener('storage', (event) => {
  if (event.key === 'cartUpdated') {
    console.log('Cart updated event detected from another page');
    updateCartSizeDisplay();
  }
});




// Initial fetch of products
window.onload = fetchAndDisplayAllProducts;
const numberDisplay = document.getElementById("cartSize");
numberDisplay.textContent = 0;
  




