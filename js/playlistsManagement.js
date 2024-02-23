
// Obteniendo los Playlists de los usuarios
var user = new URLSearchParams(window.location.search).get("user");
var playlists = JSON.parse(localStorage.getItem("users"))[user].playlists;

// Creando la lista de nombre de playlists creadas por el usuario
Object.keys(playlists).forEach(playlist =>{
  var li = document.createElement("li");
  li.innerText = playlist;
  var tbody = document.getElementById("cuerpoTabla");

  // Creando un evento click para que muestre los audios guardados en la playlist dentro de la tabla
  li.addEventListener("click",(e)=>{
		tbody.innerHTML = "";
    document.getElementById("playlistName").innerText = playlist;
    var videoIds = playlists[playlist];
    videoIds.forEach(videoId => {
      getUrlByVideoId(videoId,(data)=>{
        // Rellenando la tabla
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var img = document.createElement("img");
        img.src = data.thumbnail.xs.url;
        td.appendChild(img);
        tr.appendChild(td);

        td = document.createElement("td");
        var span = document.createElement("span");
        span.innerText = data.title;
        td.appendChild(span);
        tr.appendChild(td);
        
        td = document.createElement("td");
        span = document.createElement("span");
        span.innerText = data.author;
        td.appendChild(span);
        tr.appendChild(td);

        td = document.createElement("td");
        span = document.createElement("span");
        span.innerText = data.publishDate || "ND";
        td.appendChild(span);
        tr.appendChild(td);

        td = document.createElement("td");
        img = document.createElement("img");
  			img.className = "thumbs-up-btn"
        img.src = playlists.MeGusta.includes(videoId) ?  "images/thumbs-up-solid.svg" : "images/thumbs-up-regular.svg";
        img.style.width = "15px";
        img.style.cursor = "pointer"
        img.addEventListener("click",function(e){
          if (!playlists.MeGusta.includes(item.id.videoId)){
            this.src = "images/thumbs-up-solid.svg" 
            playlists.MeGusta.push(item.id.videoId);
            var users = JSON.parse(localStorage.getItem("users"));
            users[user].playlists = playlists;
            localStorage.setItem("users", JSON.stringify(users));
          }
        });
        td.appendChild(img);
        img = document.createElement("img");
  			img.className = "plus-btn"
        img.src = "images/plus-solid.svg";
        img.style.width = "15px";
        img.style.cursor = "pointer"
        td.appendChild(img);

				var ul = document.createElement("ul");
				ul.className = "menuPlaylist"
				Object.keys(playlists).forEach(playlist=>{
					var li = document.createElement("li");
					li.innerText = playlist;
					li.className = "elementoPlaylist"
					li.addEventListener("click",(e)=>{
						playlists[playlist].push(item.id.videoId);
						var users = JSON.parse(localStorage.getItem("users"));
						users[user].playlists = playlists;
						localStorage.setItem("users", JSON.stringify(users));
					})
					ul.appendChild(li);
				})
				td.appendChild(ul);

        img = document.createElement("img");
  			img.className = "play-btn"
        img.src = "images/circle-play-regular.svg";
        img.style.cursor = "pointer"
        img.style.width = "15px";
        img.addEventListener("click",function(e){
          getUrlByVideoId(videoId,(data)=>{
            document.getElementById("audioPlayer").src = data.url.audio;
            document.getElementById("miniatura").src = data.thumbnail.xs.url;
            document.getElementById("titulo").innerText = data.title;
            document.getElementById("canal").innerText = data.author;
            document.getElementById("meGusta").src = playlists.MeGusta.includes(videoId) ?  "images/thumbs-up-solid.svg" : "images/thumbs-up-regular.svg";
          });
        })
        td.appendChild(img);
        img = document.createElement("img");
  			img.className = "external-link-btn"
        img.src = "images/arrow-up-right-from-square-solid.svg";
        img.style.cursor = "pointer"
        img.addEventListener("click",e=>window.location = "https://www.youtube.com/watch?v="+item.id.videoId)
        img.style.width = "15px";
        td.appendChild(img);
        tr.appendChild(td);

        tbody.appendChild(tr);

      })
    })
    var tr = document.createElement("tr");
  })
  var ul = document.getElementById("playlistsNames");
  ul.appendChild(li)
})

// Realizando la busqueda
document.getElementById("searchBtn").addEventListener("click",(e)=>{
  e.preventDefault();
  var searchString = document.getElementById("searchString").value;
  window.location = "busquedaAudios.html?searchString="+searchString+"&user="+user;
});

// Agregando Playlist
document.getElementById("newPlaylistBtn").addEventListener("click",(e)=>{
  e.preventDefault();
  var newPlaylistName = document.getElementById("newPlaylistName").value;
  playlists[newPlaylistName] = [];
  var users = JSON.parse(localStorage.getItem("users"));
  users[user].playlists = playlists;
	localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
});
