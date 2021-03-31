import { searchByName, getCharacter, sortData } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const btnCharacter = document.getElementById("btn-character");
const listElement = document.getElementById("root");
const paginationElement = document.getElementById("pagination");
const menuIcon = document.querySelector("#menu-icon");
const listMenu = document.querySelector("#list-menu");
const searchBar = document.getElementById("search-bar");
const sectionCharacter = document.getElementById("section-character");
const orderFilter = document.getElementById("filter-order");
const listOrder = document.getElementById("list-order");
const listStatus = document.getElementById("list-status");
const listGender = document.getElementById("list-gender");
const listSpecie = document.getElementById("list-specie");
const DeleteBtn = document.getElementById("btn-delete");
let modalContainer = document.getElementById("modal_container");
let modal = document.getElementById("modal");
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
});

//ordenar de la a-z  z-a
orderFilter.addEventListener("click", () => {
  listOrder.innerHTML = "";
  let filterAz = document.createElement("li");
  filterAz.textContent = "A - Z";
  let filterZa = document.createElement("li");
  filterZa.textContent = "Z - A";
  listOrder.insertAdjacentElement("afterbegin", filterAz);
  listOrder.insertAdjacentElement("beforeend", filterZa);
  filterZa.classList.add("filter-btn");
  filterAz.classList.add("filter-btn");
  filterAz.id = "asc";
  filterZa.id = "desc";
});

function orderData(data) {
  listOrder.addEventListener("click", (event) => {
    //ordenar de la az
    if (event.target.classList.contains("filter-btn")) {
      let idFilter = event.target.id;
      let sortedCharacters = sortData(data, idFilter);
      displayList(sortedCharacters, listElement, numberCard, currentPage);
    }
  });
}

sectionCharacter.addEventListener("click", (event) => {
  //llenar listas  filtros
  if (event.target.classList.contains("category")) {
    let dataFilter = {};
    if (event.target.id === "filter-status") {
      const statusFilter = new Set(
        data.results.map((element) => element.status)
      );
      dataFilter = { id: "status", list: [...statusFilter] };
      drawList(dataFilter, listStatus);
    }
    if (event.target.id === "filter-gender") {
      const genderFilter = new Set(
        data.results.map((element) => element.gender)
      );
      dataFilter = { id: "gender", list: [...genderFilter] };
      drawList(dataFilter, listGender);
    }
    if (event.target.id === "filter-specie") {
      const speciesFilter = new Set(
        data.results.map((element) => element.species)
      );
      dataFilter = { id: "species", list: [...speciesFilter] };
      drawList(dataFilter, listSpecie);
    }
  }
  if (event.target.classList.contains("btn-filter")) {
    //filtros
    let currentBtn = event.target;
    // currentBtn.classList.remove("active");
    let otherBtn = document.querySelectorAll('.btn-filter')
    // otherBtn.classList.add('btn-filter.active')
    console.log(otherBtn)
        const { id, value } = event.target.dataset;
        console.log(value)
        filters[id] = value;

    if (filters[id] === value) {
      currentBtn.classList.add("active");
    }  
    if (filters[id] === value ) {
      currentBtn.classList.add("active");
    }

     console.log(filters);
   
    const filterData = filterDataCategories(data.results, filters);
    setPagination(filterData, paginationElement, numberCard);
    displayList(filterData, listElement, numberCard, currentPage);
    orderData(filterData);
  }
});

DeleteBtn.addEventListener("click", () => {
  filters = {};
  let btnFilter = document.querySelectorAll(".btn-filter.active");
  btnFilter.forEach((element) => {
    element.classList.remove("active");
  });
  filterDataCategories(data.results, filters);
  displayList(data.results, listElement, numberCard, currentPage);
  setPagination(data.results, paginationElement, numberCard);
  orderData(data.results);
});

//pintar filtros
function drawList(results, listFilter) {
  if (!listFilter.innerHTML) {
    results.list.forEach((element) => {
      let btnCategory = document.createElement("li");
      btnCategory.textContent = element;
      btnCategory.classList.add("btn-filter");
      btnCategory.dataset.id = results.id;
      btnCategory.dataset.value = element;
      listFilter.appendChild(btnCategory);
    });
    return;
  }
  listFilter.innerHTML = "";
}

function filterDataCategories(filteredData, filter) {
  let count = 0;
  const keys = Object.keys(filter);
  if (keys.length === 0) {
    return data.results;
  }
  keys.forEach((key) => {
    const filterByCategory = filteredData.filter(
      (obj) => obj[key] === filters[key]
    );
    filteredData = [...filterByCategory];
    count++;
  });
  if (count === keys.length) {
    // console.log(filteredData)
    return filteredData;
  }

  filterDataCategories(filteredData, filters);
}

displayList(data.results, listElement, numberCard, currentPage);
setPagination(data.results, paginationElement, numberCard);
search();
