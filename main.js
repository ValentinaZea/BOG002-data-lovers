import { searchByName } from "./data.js";
import { getCharacter } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const btnCharacter = document.getElementById("btn-character");
const listElement = document.getElementById("root");
const paginationElement = document.getElementById("pagination");
const menuIcon = document.querySelector("#menu-icon");
const listMenu = document.querySelector("#list-menu");
const searchBar = document.getElementById("search-bar");
const sectionCharacter = document.getElementById("section-character");
let modalContainer = document.getElementById("modal_container");
let modal = document.getElementById("modal");
let currentPage = 1;
let numberCard = 32;

//barra de busqueda
function search() {
  let barSearch = document.createElement("input");
  barSearch.type = "search";
  barSearch.placeholder = "Buscar personaje....";
  barSearch.classList.add("search-bar");
  searchBar.appendChild(barSearch);
  barSearch.addEventListener("input", () => {
    let textInpunt = barSearch.value.toLowerCase();
    let newCharacterFound = searchByName(data.results, textInpunt);
    displayList(newCharacterFound, listElement, numberCard, currentPage);
  });
}

//seccion de paginacion
function displayList(items, wrapper, cardPerPage, page) {
  wrapper.innerHTML = "";
  page--;
  let start = cardPerPage * page;
  let end = start + cardPerPage;
  let paginatedItems = items.slice(start, end);
  for (let i = 0; i < paginatedItems.length; i++) {
    let name = paginatedItems[i]["name"];
    let image = paginatedItems[i]["image"];
    let id = paginatedItems[i]["id"];
    let newDiv = document.createElement("div");
    let myImage = document.createElement("img");
    let nombre = document.createElement("h3");
    myImage.src = image;
    nombre.innerText = name;
    newDiv.dataset.character = id;
    newDiv.insertAdjacentElement("beforeend", nombre);
    newDiv.insertAdjacentElement("afterbegin", myImage);
    newDiv.classList.add("card");
    nombre.classList.add("name-card");
    myImage.classList.add("image-card");
    wrapper.appendChild(newDiv);
  }
}

function setPagination(items, wrapper, cardPerPage) {
  wrapper.innerHTML = " ";
  let pageCount = Math.ceil(items.length / cardPerPage);
  for (let i = 1; i <= pageCount; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;
  if (currentPage == page) button.classList.add("active");
  button.addEventListener("click", () => {
    currentPage = page;
    displayList(items, listElement, numberCard, currentPage);
    let currentBtn = document.querySelector(".pagenumbers button.active");
    currentBtn.classList.remove("active");
    button.classList.add("active");
  });
  return button;
}

//click menu personaje
btnCharacter.addEventListener("click", () => {
  sectionCharacter.classList.remove("hidden-section");
});

//menu
menuIcon.addEventListener("click", () => {
  listMenu.classList.toggle("toggle");
});
listMenu.addEventListener("click", (event) => {
  if (event.target.classList.contains("menuItem")) {
    listMenu.classList.toggle("toggle");
  }
});

//pintar los datos  de  personaje
listElement.addEventListener("click", (event) => {
  const cardNew = event.target.closest(".card");
  if (cardNew) {
    modal.innerHTML = " ";
    modalContainer.classList.add("showModal");
    const idCard = parseInt(cardNew.dataset.character);
    let character = getCharacter(data.results, idCard);
    let characterInfo = character["info"];
    let characterImg = character["image"];
    let exitButton = document.createElement("button");
    exitButton.textContent = "X";
    let listItem = document.createElement("ul");
    let characterImage = document.createElement("img");
    exitButton.classList.add('botonModal')
    listItem.classList.add("character-list");
    characterImage.classList.add("character-img");

    for (const property in characterInfo) {
      let item = document.createElement("li");
      item.innerHTML = `<strong>${property}:</strong> ${characterInfo[property]}`;
      listItem.appendChild(item);
    }

    for (const property in characterImg) {
      characterImage.src = characterImg[property];
    }
    modal.appendChild(exitButton);
    modal.appendChild(characterImage);
    modal.appendChild(listItem);

    exitButton.addEventListener("click", () =>
    modalContainer.classList.remove("showModal")
  );  }
});


displayList(data.results, listElement, numberCard, currentPage);
setPagination(data.results, paginationElement, numberCard);
search();
