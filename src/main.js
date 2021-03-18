// import { example } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const btnCharacter = document.getElementById("btn-character");
const list_element = document.getElementById('root');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 32;

function displayList(items, wrapper, rows_per_page, page){
  
  wrapper.innerHTML = "";
  page --;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  for(let i= 0; i < paginatedItems.length; i++){

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
    myImage.classList.add("image")

    wrapper.appendChild(newDiv);
  }
}

function setPagination(items, wrapper, rows_per_page){
  wrapper.innerHTML = " ";
  
  let page_count = Math.ceil(items.length/rows_per_page);
  for(let i = 1; i < page_count; i++)
  {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function paginationButton(page, items){
  let button = document.createElement("button");
  button.innerText = page; 

  if (current_page == page) button.classList.add('active');

  button.addEventListener("click", () => {
    current_page = page;
    displayList(items, list_element, rows, current_page);
  });
  return button;
}

btnCharacter.addEventListener("click", () => {
  displayList(data.results, list_element, rows, current_page);
  setPagination(data.results, pagination_element, rows);
});
