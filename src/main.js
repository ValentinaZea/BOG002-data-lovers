// import { example } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const btnCharacter = document.getElementById("btn-character");
const listElement = document.getElementById("root");
const paginationElement = document.getElementById("pagination");
const menuIcon = document.querySelector("#menu-icon");
const listMenu = document.querySelector("#list-menu");
let currentPage = 1;
let rows = 32;

//menu
menuIcon.addEventListener("click", () => {
  listMenu.classList.toggle("toggle");
});

listMenu.addEventListener("click", (event) => {
  if(event.target.classList.contains("menuItem")){
    listMenu.classList.toggle("toggle");
  }
});

//seccion de paginacion
function displayList(items, wrapper, rowsPerPage, page) {
  wrapper.innerHTML = "";
  page--;
  let start = rowsPerPage * page;
  let end = start + rowsPerPage;
  let paginatedItems = items.slice(start, end);
  for (let i = 0; i < paginatedItems.length; i++) {
    let name = paginatedItems[i]["name"];
    let image = paginatedItems[i]["image"];
    let newDiv = document.createElement("div");
    let myImage = document.createElement("img");
    let nombre = document.createElement("h3");
    myImage.src = image;
    nombre.innerText = name;
    newDiv.insertAdjacentElement("beforeend", nombre);
    newDiv.insertAdjacentElement("afterbegin", myImage);
    newDiv.classList.add("card");
    nombre.classList.add("name");
    myImage.classList.add("image");
    wrapper.appendChild(newDiv);
  }
}

function setPagination(items, wrapper, rowsPerPage) {
  wrapper.innerHTML = " ";
  let pageCount = Math.ceil(items.length / rowsPerPage);
  for (let i = 1; i < pageCount; i++) {
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
    displayList(items, listElement, rows, currentPage);
    let currentBtn = document.querySelector(".pagenumbers button.active");
    currentBtn.classList.remove("active");
    button.classList.add("active");
  });
  return button;
}

btnCharacter.addEventListener("click", () => {
  displayList(data.results, listElement, rows, currentPage);
  setPagination(data.results, paginationElement, rows);
});
