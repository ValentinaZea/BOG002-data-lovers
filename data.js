import data from "./data/rickandmorty/rickandmorty.js";

export const searchByName = (data, input) => {
  //barra de busqueda
  let characterFound = [];
  data.forEach((element) => {
    if (element.name.toLowerCase().includes(input))
      characterFound.push(element);
  });
  console.log(characterFound);
  return characterFound;
};

export const getCharacter = (idCard) => {
  // datos personaje por tarjeta
  let newList = {};
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i]["id"] === idCard) {
      newList = {
        image: {
          url: data.results[i].image,
        },
        info: {
          Nombre: data.results[i].name,
          Estado: data.results[i].status,
          Especie: data.results[i].species,
          Genero: data.results[i].gender,
          Origen: data.results[i]["origin"].name,
          Locación: data.results[i]["location"].name,
          "Episodios de aparición": data.results[i]["episode"].length,
        },
      };
    }
  }
  return newList;
};

export const sortData = (data, sortOrder) => {
  // ordenar a la az
  data.sort((a, b) => {
    // Si a es mayor que b 1 hace que b vaya antes que a
    if (a.name > b.name) {
      return 1;
    }
    // Si a es menor que b -1 hace que a vaya antes que b
    if (a.name < b.name) {
      return -1;
    }
    // Si son iguales retorna cero, no hay cambio de posiciones
    return 0;
  });
  if (sortOrder !== "asc") {
    return data.reverse();
  }
  return data;
};

export function filterDataCategories(filteredData, filter) {
  let count = 0;
  const keys = Object.keys(filter);
  if (keys.length === 0) {
    return filteredData;
  }
  keys.forEach((key) => {
    const filterByCategory = filteredData.filter(
      (obj) => obj[key] === filter[key]
    );
    filteredData = [...filterByCategory];
    count++;
  });
  if (count === keys.length) {
    return filteredData;
  }
  // filterDataCategories(filteredData, filter);
  // console.log(filterDataCategories(filteredData, filter));
}
