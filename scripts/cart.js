function addToCart(productToAdd) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);
  
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push(productToAdd);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Alerta visual de éxito
  Swal.fire({
    title: '¡Agregado!',
    text: `${productToAdd.name} ha sido agregado al carrito.`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false
  });
  
  updateCartCounter();
}


function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCounter = document.getElementById('cart-counter');
  
  if (cartCounter) {
    if (itemCount > 0) {
      cartCounter.innerText = itemCount;
      cartCounter.style.display = 'inline-block'; 
    } else {
      cartCounter.style.display = 'none';
    }
  }
}


function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.id === id);
  
  if (productIndex > -1) {
    cart[productIndex].quantity += change; 
  
    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); 
    updateCartCounter(); 
  }
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCounter();
}


function renderCart() {
  const cartContainer = document.getElementById('cart-items-container');
  
  
  if (!cartContainer) return; 

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartVacio = document.getElementById('carrito-vacio');
  const cartLleno = document.getElementById('carrito-lleno');

  if (cart.length === 0) {
    cartVacio.style.display = 'block';
    cartLleno.style.display = 'none';
    return;
  }
  
  cartVacio.style.display = 'none';
  cartLleno.style.display = 'block';
  
  cartContainer.innerHTML = ''; 
  let total = 0;
  
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    
    const imageUrl = item.imgSrc ? item.imgSrc : 'https://via.placeholder.com/100';

    cartContainer.innerHTML += `
      <div class="d-flex align-items-center mb-3">
        <img src="${imageUrl}" alt="${item.name}" class="rounded me-3" width="80" height="80" style="object-fit:cover;">
        <div class="flex-grow-1">
          <h5 class="mb-1">${item.name}</h5>
          <p class="mb-1 text-white-50">Cantidad: 
            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateQuantity('${item.id}', 1)">+</button>
          </p>
          <h6 class="text-royal fw-bold">$${(subtotal).toLocaleString('es-CL')}</h6>
        </div>
        <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart('${item.id}')" title="Eliminar">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <hr style="border-color: rgba(255,255,255,0.2);">
    `;
  });
  

  const totalElement = document.getElementById('cart-total');
  if(totalElement) {
      totalElement.innerText = `$${total.toLocaleString('es-CL')}`;
  }
}


function purchaseCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    Swal.fire('Carrito Vacío', 'No hay nada que comprar.', 'error');
    return;
  }

  
  let total = 0;
  let summaryHtml = '<ul class="list-group text-start">';
  
  cart.forEach(item => {
    total += item.price * item.quantity;
    summaryHtml += `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #333; color: white; border-color: #444;">
                      ${item.name} (x${item.quantity})
                      <span>$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                    </li>`;
  });
  
  summaryHtml += `<li class="list-group-item d-flex justify-content-between align-items-center active" style="background-color: var(--royal-blue); border-color: var(--royal-blue);">
                    <strong>Total</strong>
                    <strong>$${total.toLocaleString('es-CL')}</strong>
                  </li></ul>`;
  
 
  Swal.fire({
    title: 'Confirma tu Compra',
    html: summaryHtml,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#4169E1',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar y Pagar'
  }).then((result) => {
    if (result.isConfirmed) {
      

      let history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
      const purchase = {
        date: new Date().toLocaleString('es-CL'),
        items: cart,
        total: total
      };
      history.unshift(purchase); 
      localStorage.setItem('purchaseHistory', JSON.stringify(history));
      
      
      localStorage.setItem('cart', JSON.stringify([]));
      
      Swal.fire(
        '¡Comprado con éxito!',
        'Tu compra ha sido registrada en el historial.',
        'success'
      ).then(() => {
        location.reload(); 
      });
    }
  });
}

function renderHistory() {
  const historyContainer = document.getElementById('historial-compras-container');

  if (!historyContainer) return; 
  
  const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
  
  if (history.length === 0) {
    historyContainer.innerHTML = '<p class="text-white-50">No tienes compras anteriores.</p>';
    return;
  }
  
  historyContainer.innerHTML = ''; 
  
  history.forEach(purchase => {
    let itemsHtml = '';
    purchase.items.forEach(item => {
      itemsHtml += `<li class="text-white-50" style="list-style-type: none;">• ${item.name} (x${item.quantity})</li>`;
    });
    
    historyContainer.innerHTML += `
      <div class="card mb-3 shadow-sm">
        <div class="card-header" style="background-color: #0a2351; color: white;">
          <i class="bi bi-receipt me-2"></i> Compra: ${purchase.date}
        </div>
        <div class="card-body">
          <ul class="text-white" style="padding-left: 10px;">
            ${itemsHtml}
          </ul>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center" style="background-color: rgba(0,0,0,0.3);">
          <span class="badge bg-success fs-6">PAGADO</span>
          <strong class="text-white fs-5">Total: $${purchase.total.toLocaleString('es-CL')}</strong>
        </div>
      </div>
    `;
  });
}


document.addEventListener('click', function(e) {
  
  const button = e.target.closest('.btn-add-to-cart');

  if (button) {
    e.preventDefault(); 
    
    // Verificar Login
    const userRole = sessionStorage.getItem('userRole');
    if (!userRole) {
      Swal.fire({
        title: 'Inicia Sesión',
        text: 'Necesitas una cuenta para comprar.',
        icon: 'warning',
        confirmButtonText: 'Ir al Login',
        confirmButtonColor: '#4169E1'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'login.html';
        }
      });
      return;
    }

    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: parseInt(button.dataset.price),
      imgSrc: button.dataset.img,
      quantity: 1
    };
    addToCart(product);
  }
  const buyButton = e.target.closest('#btn-comprar');
  if (buyButton) {
      e.preventDefault();
      purchaseCart();
  }
});
document.addEventListener('DOMContentLoaded', function() {
  updateCartCounter();
  renderCart();
  renderHistory();
});

