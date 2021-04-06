import { searchByName, sortData, filterDataCategories } from "./data.js";
import { displayList, setPagination } from "./pagination.js";
import { paintCharacterCard } from "./character_card.js";
import { getListFilters } from "./filter_data_dom.js";
import data from "./data/rickandmorty/rickandmorty.js";

const btnCharacter = document.getElementById("btn-character");
const listElement = document.getElementById("root");
const paginationElement = document.getElementById("pagination");
const menuIcon = document.querySelector("#menu-icon");
const listMenu = document.querySelector("#list-menu");
const searchBar = document.getElementById("search-bar");
const sectionCharacter = document.getElementById("section-character");
const listOrder = document.getElementById("list-order");
const DeleteBtn = document.getElementById("btn-delete");
let currentPage = 1;
let numberCard = 32;
let filters = {};

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
    setPagination(newCharacterFound, paginationElement, numberCard);
    orderData(newCharacterFound);
  });
}

//pintar botones de la a-z  z-a
function drawSort() {
  listOrder.innerHTML = "";
  let filterAz = document.createElement("img");
  filterAz.src = "img/az.svg";
  let filterZa = document.createElement("img");
  filterZa.src = "img/za.svg";
  listOrder.insertAdjacentElement("afterbegin", filterAz);
  listOrder.insertAdjacentElement("beforeend", filterZa);
  filterZa.classList.add("filter-btn");
  filterAz.classList.add("filter-btn");
  filterAz.id = "asc";
  filterZa.id = "desc";
}

// ordenar de la a-z  z-a
function orderData(data) {
  listOrder.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-btn")) {
      let idFilter = event.target.id;
      let sortedCharacters = sortData(data, idFilter);
      displayList(sortedCharacters, listElement, numberCard, currentPage);
    }
  });
}

//pintar los datos  de  personaje
listElement.addEventListener("click", (event) => {
  const cardNew = event.target.closest(".card");
  paintCharacterCard(cardNew, data.results);
});

//click mostrar menu
btnCharacter.addEventListener("click", () => {
  sectionCharacter.classList.remove("hidden-section");
});

//menu resposive toggle
menuIcon.addEventListener("click", () => {
  listMenu.classList.toggle("toggle");
});
listMenu.addEventListener("click", (event) => {
  if (event.target.classList.contains("menuItem")) {
    listMenu.classList.toggle("toggle");
  }
});

//llenar listas  filtros
sectionCharacter.addEventListener("click", (event) => {
  if (event.target.classList.contains("category")) {
    const categorySelected = event.target.id;
    getListFilters(categorySelected);
  }
});

// filtrar  personajes - cambio de estado  de botones
sectionCharacter.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-filter")) {
    const { id, value } = event.target.dataset;
    filters[id] = value;
    const filterData = filterDataCategories(data.results, filters);
    setPagination(filterData, paginationElement, numberCard);
    displayList(filterData, listElement, numberCard, currentPage);
    orderData(filterData);
    statusButton();
  }
});

//pintar los botones del filtro
function statusButton() {
  const othersButtons = document.querySelectorAll(".btn-filter");
  othersButtons.forEach((element) => {
    const idByElement = element.dataset.id;
    const valueByElement = element.dataset.value;
    // const { id: idByElement, value: valueByElement } = element.dataset;
    if (filters[idByElement] === valueByElement) {
      element.classList.remove("inactive");
      element.classList.add("active");
    } else {
      element.classList.remove("active");
      element.classList.add("inactive");
    }
  });
}

//limpiar filtros - todos los personajes
DeleteBtn.addEventListener("click", () => {
  filters = {};
  let btnFilter = document.querySelectorAll(".btn-filter");
  btnFilter.forEach((element) => {
    element.classList.remove("inactive");
    element.classList.remove("active");
  });
  filterDataCategories(data.results, filters);
  displayList(data.results, listElement, numberCard, currentPage);
  setPagination(data.results, paginationElement, numberCard);
  orderData(data.results);
});

displayList(data.results, listElement, numberCard, currentPage);
setPagination(data.results, paginationElement, numberCard);
orderData(data.results);
search();
drawSort();
