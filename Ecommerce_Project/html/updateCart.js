window.addEventListener('storage', (event) => {
    if (event.key === 'cartUpdated') {         
      updateCartSizeDisplay();
    }
  });
  


function updateCartSizeDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSize = cart.length; 
    console.log("cart size : "+cartSize);
    const numberDisplay = document.getElementById("cartSize");
    if (numberDisplay) {
      numberDisplay.textContent = cartSize;
    }
  }
  

  window.onload = updateCartSizeDisplay;