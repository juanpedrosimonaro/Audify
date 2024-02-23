
// Obteniendo los Playlists de los usuarios
var user = new URLSearchParams(window.location.search).get("user");
var searchString = new URLSearchParams(window.location.search).get("searchString");
document.getElementById("resultadoBusqueda").innerText = searchString;
const API_KEY = "AIzaSyBjwA6XEmde1uOniBUISaUCztUD_xE9-Tk";
var playlists = JSON.parse(localStorage.getItem("users"))[user].playlists;
var tbody = document.getElementById("cuerpoTabla");

var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchString}&maxResults=10&type=video&key=${API_KEY}`;


// Rellenando la tabla con los resultados
fetch(url).then(res=>res.json()).then(data=>data.items.forEach(item=>{
  console.log(item)
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  var img = document.createElement("img");
  img.src = item.snippet.thumbnails.default.url ;
  td.appendChild(img);
  tr.appendChild(td);

  td = document.createElement("td");
  var span = document.createElement("span");
  span.innerText = item.snippet.title;
  td.appendChild(span);
  tr.appendChild(td);
  
  td = document.createElement("td");
  span = document.createElement("span");
  span.innerText = item.snippet.channelTitle;
  td.appendChild(span);
  tr.appendChild(td);

  td = document.createElement("td");
  span = document.createElement("span");
  span.innerText = item.snippet.publishedAt || "ND";
  td.appendChild(span);
  tr.appendChild(td);

  td = document.createElement("td");
  img = document.createElement("img");
  img.className = "thumbs-up-btn"
  img.src = playlists.MeGusta.includes(item.id.videoId) ?  "images/thumbs-up-solid.svg" : "images/thumbs-up-regular.svg";
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
  img.style.width = "15px";
  td.appendChild(img);
  img = document.createElement("img");
  img.className = "plus-btn"
  img.src = "images/plus-solid.svg";
  img.style.cursor = "pointer"
  img.style.width = "15px";
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
  img.style.width = "15px";
  img.style.cursor = "pointer"
  img.addEventListener("click",function(e){
    getUrlByVideoId(item.id.videoId,(data)=>{
      document.getElementById("audioPlayer").src = data.url.audio;
      document.getElementById("miniatura").src = data.thumbnail.xs.url;
      document.getElementById("titulo").innerText = data.title;
      document.getElementById("canal").innerText = data.author;
      document.getElementById("fecha").innerText = item.publishedAt;
      console.log(playlists.MeGusta.includes(item.id.videoId))
      document.getElementById("meGusta").src = playlists.MeGusta.includes(item.id.videoId) ?  "images/thumbs-up-solid.svg" : "images/thumbs-up-regular.svg";
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
}))

document.getElementById("playlists-btn").addEventListener("click",(e)=>window.location = "playlists.html?user="+user)

