// import { example } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const root = document.getElementById("root");
const btnCharacter = document.getElementById("btn-character");

btnCharacter.addEventListener("click", () => {
  for (let i = 0; i < data.results.length; i++) {
    let name = data.results[i]["name"];
    let image = data.results[i]["image"];
    let newDiv = document.createElement("div");
    let myImage = document.createElement("img");
    myImage.src = image;
    let nombre = document.createElement("h3");
    nombre.innerText = name;
    newDiv.insertAdjacentElement("beforeend", nombre);
    newDiv.insertAdjacentElement("afterbegin", myImage);
    root.appendChild(newDiv);
    newDiv.classList.add("card");
    nombre.classList.add("name");
    myImage.classList.add("image")
  }
});
