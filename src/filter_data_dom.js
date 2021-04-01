import data from "./data/rickandmorty/rickandmorty.js";

const listStatus = document.getElementById("list-status");
const listGender = document.getElementById("list-gender");
const listSpecie = document.getElementById("list-specie");

//pintar filtros
export function drawList(results, listFilter) {
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

export function getListFilters(categorySelected) {
  let dataFilter = {};
  let categoryList;
  switch (categorySelected) {
    case "filter-status":
      categoryList = new Set(data.results.map((element) => element.status));
      dataFilter = { id: "status", list: [...categoryList] };
      drawList(dataFilter, listStatus);
      break;
    case "filter-gender":
      categoryList = new Set(data.results.map((element) => element.gender));
      dataFilter = { id: "gender", list: [...categoryList] };
      drawList(dataFilter, listGender);
      break;
    case "filter-specie":
      categoryList = new Set(data.results.map((element) => element.species));
      dataFilter = { id: "species", list: [...categoryList] };
      drawList(dataFilter, listSpecie);
      break;
  }
  return dataFilter, categorySelected;
}
