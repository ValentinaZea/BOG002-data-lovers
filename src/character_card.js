//pintar los datos  de  personaje
import {getCharacter} from "./data.js";

let modalContainer = document.getElementById("modal_container");
let modal = document.getElementById("modal");

    export function paintCharacterCard(cardNew,data){
    if (cardNew) {
      modal.innerHTML = " ";
      modalContainer.classList.add("showModal");
      const idCard = parseInt(cardNew.dataset.character);
      let character = getCharacter(data, idCard);
      let characterInfo = character["info"];
      let characterImg = character["image"];
      let exitButton = document.createElement("button");
      exitButton.textContent = "X";
      let containerCharacter = document.createElement("div");
      let listItem = document.createElement("ul");
      let characterImage = document.createElement("img");
      exitButton.classList.add("botonModal");
      listItem.classList.add("character-list");
      characterImage.classList.add("character-img");
      containerCharacter.classList.add("containerCharacter");
      for (const property in characterInfo) {
        let item = document.createElement("li");
        item.innerHTML = `<strong>${property}:</strong> ${characterInfo[property]}`;
        listItem.appendChild(item);
      }
      for (const property in characterImg) {
        characterImage.src = characterImg[property];
      }
      modal.appendChild(exitButton);
      containerCharacter.appendChild(characterImage);
      containerCharacter.appendChild(listItem);
      modal.appendChild(containerCharacter);
      exitButton.addEventListener("click", () =>
        modalContainer.classList.remove("showModal")
      );
    }
  }