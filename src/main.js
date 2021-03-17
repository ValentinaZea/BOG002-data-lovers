// import { example } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const root = document.getElementById("root");
const btnCharacter = document.getElementById("btn-character");

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 5;

function displayList(items, wrapper, rows_per_page, page){

  wrapper.innerHTML = "";
  page --;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  console.log(paginatedItems);

  for(let i= 0; i < paginatedItems.length; i++){

    // console.log(item);
    let item = paginatedItems[i];
    let name = paginatedItems[i]["name"];
    let image = paginatedItems[i]["image"];
    
    // let name = data.results[i]["name"];
    // let image = data.results[i]["image"];
    let newDiv = document.createElement("div");
    let myImage = document.createElement("img");
    let nombre = document.createElement("h3");
    
    myImage.src = image;
    nombre.innerText = name;
    newDiv.insertAdjacentElement("beforeend", nombre);
    newDiv.insertAdjacentElement("afterbegin", myImage);

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
  // for (let i = 0; i < data.results.length; i++) {
  //   let name = data.results[i]["name"];
  //   let image = data.results[i]["image"];
  //   let newDiv = document.createElement("div");
  //   let myImage = document.createElement("img");
  //   myImage.src = image;
  //   let nombre = document.createElement("h3");
  //   nombre.innerText = name;
  //   newDiv.insertAdjacentElement("beforeend", nombre);
  //   newDiv.insertAdjacentElement("afterbegin", myImage);
  //   root.appendChild(newDiv);
  //   newDiv.classList.add("card");
  //   nombre.classList.add("name");
  //   myImage.classList.add("image")
  // }
  displayList(data.results, list_element, rows, current_page);
  setPagination(data.results, pagination_element, rows);
});
