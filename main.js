// import { example } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

let nombre = document.getElementById("prueba");

for (let i = 0; i < data.results.length; i++) {
  //   console.log(data.results[i]["id"]);
  //   console.log(data.results[i]["name"]);
  // nombre.innerHTML += `nombre:${data.results[i]["image"]}<br>`;
    var newDiv = document.createElement('div');
    // document.getElementsByClassName('character-card');
    var img = document.createElement('img'); 
    img.src = data.results[i]["image"];
    var name = document.createTextNode(data.results[i]["name"]); 
    newDiv.appendChild(img); 
    newDiv.appendChild(name);
    document.getElementById("root").appendChild(newDiv);

}

console.log(data);
console.log(data.results[0]);
