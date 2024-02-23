// Función para verificar si el nombre de usuario y la contraseña son válidos
function check() {
  // Obtener el nombre de usuario y la contraseña del formulario
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  // Obtener el array de usuarios del localstorage o crear uno vacío si no existe
  var users = JSON.parse(localStorage.getItem("users")) || [];
	console.log(users);
  // Generar el hash de la contraseña
	var hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
	console.log(hashedPassword)
	// Buscar si hay algún usuario que coincida con el nombre de usuario y el hash de la contraseña
	var indexFound = users.findIndex( user => user.username === username && user.password === hashedPassword);
	// Mostrar un mensaje según el resultado de la búsqueda
	if (indexFound >= 0) {
		window.location = "playlists.html?user="+indexFound
	} else {
		alert("Nombre de usuario o contraseña incorrectos");
	}
}

// Añadir un evento al botón de login para llamar a la función check
var loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  check();
});
