
document.addEventListener("DOMContentLoaded", function() {
  const userRole = sessionStorage.getItem('userRole');
  const userName = sessionStorage.getItem('userName');
  
  const navCuenta = document.getElementById('nav-cuenta');

  if (!navCuenta) {
    return;
  }

  if (userRole && userName) {
  
    
    let roleLabel = '';
    if (userRole === 'admin') {
      roleLabel = '<span class="badge bg-danger ms-2">Admin</span>';
    } else {
      roleLabel = '<span class="badge bg-primary ms-2">Usuario</span>';
    }

   
    navCuenta.innerHTML = `
      <a class="nav-link" href="#" style="cursor: default;">
        <i class="bi bi-person-check-fill me-1"></i>
        Hola, ${userName}
        ${roleLabel} 
      </a>
    `;

    
    const logoutLi = document.createElement('li');
    logoutLi.className = 'nav-item';
    logoutLi.innerHTML = `
      <a class="nav-link" href="#" id="logout-link" style="cursor: pointer;">
        <i class="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
      </a>
    `;
    
    
    navCuenta.parentNode.insertBefore(logoutLi, navCuenta.nextSibling);

    document.getElementById('logout-link').addEventListener('click', function(e) {
      e.preventDefault();
      
      Swal.fire({
        title: '¿Cerrar sesión?',
        text: "¿Estás seguro de que quieres cerrar tu sesión?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4169E1',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          
     
          sessionStorage.removeItem('userRole');
          sessionStorage.removeItem('userName');

       
          localStorage.removeItem('cart');
          localStorage.removeItem('purchaseHistory');
      
          window.location.href = 'login.html';
        }
      });
    });

  } else {
  
  }
});