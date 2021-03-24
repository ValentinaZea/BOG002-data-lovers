import { searchByName } from "./data.js";
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
    nombre.classList.add("name");
    myImage.classList.add("image");
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
  //modalContainer.classList.add("showModal");
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
  //console.log(event.target);
  //event.stopPropagation();
  


  // console.log(idCharacter.dataset.character);
  if (event.target.classList.contains("card")) {
  let cardDiv = document.querySelectorAll(".card").forEach((element)=>{
    console.log(element);
  });
   
  }
  
});

displayList(data.results, listElement, numberCard, currentPage);
setPagination(data.results, paginationElement, numberCard);
search();
