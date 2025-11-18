document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registroForm").addEventListener("submit", function() {
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById("password-confirm").value;

      if (nombre === '' || email === '' || password === '' || passwordConfirm === '') {
          Swal.fire({ title: 'Campos incompletos', text: 'Rellena todos los campos.', icon: 'warning', confirmButtonColor: '#4169E1' });
          return; 
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          Swal.fire({ title: 'Correo no válido', icon: 'error', confirmButtonColor: '#4169E1' });
          return;
      }
      if (localStorage.getItem(email)) {
        Swal.fire({ title: 'Usuario ya registrado', text: 'Ese correo ya tiene cuenta.', icon: 'error', confirmButtonColor: '#4169E1' });
        return; 
      }
      if (password !== passwordConfirm) {
        Swal.fire({ title: 'Error de contraseña', text: 'Las contraseñas no coinciden.', icon: 'error', confirmButtonColor: '#4169E1' });
        return; 
      }
      
      const nuevoUsuario = { nombre: nombre, password: password };
      localStorage.setItem(email, JSON.stringify(nuevoUsuario));

      Swal.fire({
        title: '¡Registro exitoso!',
        text: `Bienvenido, ${nombre}.`,
        icon: 'success',
        confirmButtonColor: '#4169E1'
      }).then(() => { window.location.href = "login.html"; });
    });
});