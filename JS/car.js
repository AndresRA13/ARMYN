// Función para mostrar el carrito
function displayCart() {
    // Recupera el carrito de localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Selecciona el elemento donde se mostrará el carrito
    var cartContainer = document.getElementById("cartContainer");
    console.log("cartContainer:", cartContainer);
  
    // Selecciona el elemento donde se mostrará el total
    var totalAmountElement = document.getElementById("totalAmount");
    console.log("totalAmountElement:", totalAmountElement);
  
    var total = 0;
  
    // Limpiar el contenido anterior del contenedor del carrito
    cartContainer.innerHTML = '';
  
    // Itera sobre los productos en el carrito y los muestra
    cart.forEach(function (product, index) {
      var productElement = document.createElement("div");
      var subtotal = parseFloat(product.price) * parseInt(product.quantity); // Calcula el subtotal
  
      productElement.innerHTML = `
        <div class="cart-item">
          <img src="${product.imageSrc}" alt="" class="cart-image" />
          <div class="cart-details">
            <div>${product.title}</div>
            <div>Size: ${product.size}</div>
            <div>Quantity: ${product.quantity}</div>
            <div>Price: $${product.price}</div>
            <div>Subtotal: $${subtotal.toFixed(2)}</div> <!-- Muestra el subtotal -->
            <button class="remove-item-btn" data-index="${index}" onclick="removeItem(${index})">Remove Item</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(productElement);
  
      // Agrega el subtotal al total
      total += subtotal;
    });
  
    // Muestra el total actualizado
    totalAmountElement.textContent = total.toFixed(2); // Asegura que se muestren dos decimales
    console.log("Total:", total);
  
    // Muestra el botón de pago solo si hay elementos en el carrito
    var payButton = document.getElementById("payButton");
    payButton.style.display = cart.length > 0 ? "block" : "none";
  }
  
  // Función para redirigir a PayPal
  function redirectToPayPal() {
    // Recupera el total actualizado
    var total = parseFloat(document.getElementById("totalAmount").textContent);
  
    // Redirige a la página de PayPal con el total como parámetro
    window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&amount=${total}&currency_code=USD&business=rojasaguileraandres13@gmail.com`;
  }
  
  // Función para remover un elemento del carrito
  function removeItem(index) {
    // Recupera el carrito de localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Elimina el elemento del carrito según el índice
    cart.splice(index, 1);
  
    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Vuelve a mostrar el carrito
    displayCart();
    Swal.fire({
        title: "Felicidades!",
        text: "Se elimino correctamente!",
        icon: "success"
      });
  }
  
  // Utiliza el evento 'storage' para detectar cambios en localStorage
  window.addEventListener('storage', function (event) {
    if (event.key === 'cart') {
      // Actualiza el carrito en la interfaz si cambia en localStorage
      displayCart();
    }
  });
  
  // Llama a la función para mostrar el carrito al cargar la página
  document.addEventListener("DOMContentLoaded", function () {
    displayCart();
  });
  