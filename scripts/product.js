document.addEventListener('DOMContentLoaded', function() {
    const allProducts = {
        '1': { name: 'Espuma Alta Densidad', price: 12990, imgSrc: 'img/espuma-alta.webp', description: 'Espuma de alta densidad (D25) ideal para cojines de asiento, sofás y tapicería que requiere firmeza y durabilidad.' },
        '2': { name: 'Tela Lino Antimanchas', price: 8990, imgSrc: 'img/tela-lino.webp', description: 'Tela de lino con tratamiento especial antimanchas. Perfecta para tapizar sillas, sofás y cojines. Precio por metro lineal.' },
        '3': { name: 'Pegamento tapicero 3lts', price: 9990, imgSrc: 'img/pegamento.webp', description: 'Adhesivo de contacto de alta resistencia, formulado especialmente para trabajos de tapicería. Pega espuma, tela, madera y más.' },
        '4': { name: 'Tela Chenille Suave', price: 7490, imgSrc: 'img/chenille.webp', description: 'Tela Chenille de tacto suave y acabado elegante. Ideal para sofás de interior.' },
        '5': { name: 'Cuero Sintético Premium', price: 11990, imgSrc: 'img/cuero.webp', description: 'Ecocuero de alta resistencia al roce, fácil limpieza y apariencia sofisticada.' },
        '6': { name: 'Tachuelas Decorativas', price: 4990, imgSrc: 'img/tachuelas.jpg', description: 'Caja de tachuelas decorativas color bronce antiguo. Ideales para dar un acabado profesional.' },
        '7': { name: 'Espuma Densidad Media', price: 8990, imgSrc: 'img/espuma-media.webp', description: 'Espuma de densidad media (D21), versátil para respaldos de cama, cojines decorativos y colchonetas.' },
        '8': { name: 'Espuma Baja Densidad (Soft)', price: 6990, imgSrc: 'img/espuma-baja.webp', description: 'Espuma suave de baja densidad (D15), utilizada como capa de confort sobre espumas más firmes o para manualidades.' },
        '9': { name: 'Corchetes 80/10 (Caja 5000)', price: 7990, imgSrc: 'img/corchetes-80.webp', description: 'Caja de 5000 corchetes de tapicería, medida 80/10. Indispensables para corchetera neumática.' },
        '10': { name: 'Hilo Tapicero Alta Resistencia', price: 3990, imgSrc: 'img/hilo.webp', description: 'Cono de hilo de poliéster de alta resistencia, especial para costuras de tapicería que soportan alta tensión.' },
        '11': { name: 'Corchetes 71/12 (Caja 10000)', price: 9490, imgSrc: 'img/corchetes-71.webp', description: 'Caja de 10000 corchetes de tapicería, medida 71/12. Para trabajos que requieren una sujeción más fina.' }
    };

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = allProducts[productId];
    const container = document.getElementById('producto-detalle-container');
    
    if (product) {
      document.getElementById('product-image').src = product.imgSrc;
      document.getElementById('product-name').innerText = product.name;
      document.getElementById('product-price').innerText = `$${product.price.toLocaleString('es-CL')}`;
      document.getElementById('product-description').innerText = product.description;

      document.getElementById('btn-add-to-cart-detalle').addEventListener('click', function() {
        const userRole = sessionStorage.getItem('userRole');
        if (!userRole) {
          Swal.fire({ title: 'Acceso Requerido', text: 'Inicia sesión para comprar.', icon: 'warning', confirmButtonColor: '#4169E1', confirmButtonText: 'Ir a Login' })
          .then(() => { window.location.href = 'login.html'; });
          return; 
        }
        addToCart({ id: productId, name: product.name, price: product.price, imgSrc: product.imgSrc, quantity: 1 });
      });
    } else {
      container.innerHTML = `<div class="col-12 text-center"><h2>Producto no encontrado</h2><a href="index.html" class="btn btn-primary mt-3">Volver</a></div>`;
    }
});