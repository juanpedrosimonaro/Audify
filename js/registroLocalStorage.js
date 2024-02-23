function store() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
	var hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
	// Obtener el array de usuarios del localstorage o crear uno vacío si no existe
	var users = JSON.parse(localStorage.getItem("users")) || [];
	// Crear un objeto con el nombre de usuario y el hash de la contraseña
	var user = {
		username: username,
		password: hashedPassword,
		email: email,
		playlists: {MeGusta:[]}
	};
	// Añadir el objeto al array de usuarios
	users.push(user);
	// Guardar el array de usuarios en el localstorage
	localStorage.setItem("users", JSON.stringify(users));
	window.location = "plalists.html?user="+(users.length - 1)
}

function validateForm(e) {
  e.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var repeatPassword = document.getElementById("repeatPassword").value;
  if (username && password && password == repeatPassword ) {
    store();
  } else {
    alert("Por favor, rellene todos los campos");
  }
}

var registerBtn = document.getElementById("register-btn");
registerBtn.addEventListener("click", validateForm);
