function init(numeroPaginas = 0) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
        new Datos(response).render();
      }
    };
    let url = `https://dummyapi.io/data/v1/post?limit=${limite}&page=${numeroPaginas}`;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("app-id", "64762ccc042da10aab777784");
    xhr.send();
  }
  function Datos(response) {
    this.response = response;
    const mascotasDiv = document.getElementById("mascotas");
    const paginasDiv = document.getElementById("btn");
    this.render = function () {
      mascotasDiv.innerHTML = "";
      for (const items of this.response.data) {
        mascotasDiv.innerHTML += `<li>
              <img src="${items.owner.picture}" width="60px"/>
              ${items.owner.title} ${items.owner.firstName} ${items.owner.lastName}
              ${items.publishDate}
              <img src="${items.image}" width="100"/>
              ${items.publishDate}
              ${items.text}
              ${items.likes}</li>`;
          for (const tag of items.tags){
              mascotasDiv.innerHTML += `<a href="tags.html?tags=${tag}">${tag}</a>`;
          }
      }
      paginasDiv.innerHTML = "";
      for (let i = 1; i <= this.response.total / limite; i++) {
        paginasDiv.innerHTML += `<a href="#" onclick="init(${i})">${i}</a> `;
      }
    };
  }
  function tags() {
    let userTags = new URLSearchParams(window.location.search).get("tags");
    let tagsDiv = document.getElementById("tags");
    let xhr = new XMLHttpRequest();
    let paginasDiv= document.getElementById("paginas");
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        let usuarios = JSON.parse(this.responseText);
        tagsDiv.innerHTML = "";
        for (const items of usuarios.data) {
          tagsDiv.innerHTML += `
              <img src="${items.owner.picture}" width="60px"/>
              <p>${items.owner.title} ${items.owner.firstName} ${items.owner.lastName}</p>
              <p>${items.publishDate}</p>
              <img src="${items.image}" width="100"/>
              <p>${items.publishDate}</p>
              <p>${items.text}</p>
              <p>${items.likes}</p>`;
              for (const tag of items.tags){
                  tagsDiv.innerHTML += `<a href="tags.html?tags=${tag}">${tag}</a>`;
              }
        }
        paginasDiv.innerHTML = "";
        for (let i = 1; i <= this.response.total / limite; i++) {
          paginasDiv.innerHTML += `<a href="#" onclick="init(${i})">${i}</a> `;
        }
      }
    };
    let url = `https://dummyapi.io/data/v1/tag/${userTags}/post?limit=${limite}`;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("app-id", "64762ccc042da10aab777784");
    xhr.send();
  }