// import { example } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

let nombre = document.getElementById("prueba");

for (let i = 0; i < data.results.length; i++) {
  //   console.log(data.results[i]["id"]);
  //   console.log(data.results[i]["name"]);
  // nombre.innerHTML += `nombre:${data.results[i]["image"]}<br>`;
  nombre.innerHTML += `<img loading="lazy" src="${data.results[i]["image"]}"/> <br> ${data.results[i]["name"]} <br>`;
}

console.log(data);
console.log(data.results[0]);
