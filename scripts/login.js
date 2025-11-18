document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        const adminEmail = "ipvgnovidecor@gmail.com";
        const adminPass = "admin1234"; 
        
        if (email === adminEmail) {
          if (password === adminPass) {
            sessionStorage.setItem('userRole', 'admin');
            sessionStorage.setItem('userName', 'Administrador');
            Swal.fire({
              title: '¡Bienvenido Administrador!',
              text: 'Accediendo al panel de control.',
              icon: 'success',
              confirmButtonColor: '#4169E1'
            }).then(() => { window.location.href = "index.html"; });
          } else {
            Swal.fire({ title: 'Error', text: 'Contraseña de administrador incorrecta.', icon: 'error', confirmButtonColor: '#4169E1' });
          }
          return; 
        }
        
        const userDataString = localStorage.getItem(email);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (password === userData.password) {
            sessionStorage.setItem('userRole', 'usuario');
            sessionStorage.setItem('userName', userData.nombre); 
            Swal.fire({
              title: `¡Bienvenido, ${userData.nombre}!`,
              text: 'Has iniciado sesión correctamente.',
              icon: 'success',
              confirmButtonColor: '#4169E1'
            }).then(() => { window.location.href = "index.html"; });
          } else {
            Swal.fire({ title: 'Error', text: 'Contraseña incorrecta.', icon: 'error', confirmButtonColor: '#4169E1' });
          }
        } else {
          Swal.fire({ title: 'Error', text: 'No se encontró ninguna cuenta con ese correo.', icon: 'error', confirmButtonColor: '#4169E1' });
        }
    });
});