// Funci�n para verificar si el nombre de usuario y la contrase�a son v�lidos
function check() {
  // Obtener el nombre de usuario y la contrase�a del formulario
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  // Obtener el array de usuarios del localstorage o crear uno vac�o si no existe
  var users = JSON.parse(localStorage.getItem("users")) || [];
	console.log(users);
  // Generar el hash de la contrase�a
	var hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
	console.log(hashedPassword)
	// Buscar si hay alg�n usuario que coincida con el nombre de usuario y el hash de la contrase�a
	var indexFound = users.findIndex( user => user.username === username && user.password === hashedPassword);
	// Mostrar un mensaje seg�n el resultado de la b�squeda
	if (indexFound >= 0) {
		window.location = "playlists.html?user="+indexFound
	} else {
		alert("Nombre de usuario o contrase�a incorrectos");
	}
}

// A�adir un evento al bot�n de login para llamar a la funci�n check
var loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  check();
});
