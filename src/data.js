export const searchByName = (dataOriginal, input) => {  //barra de busqueda
  let characterFound = [];
  dataOriginal.forEach((element) => {
    if (element.name.toLowerCase().includes(input))
      characterFound.push(element);
  });
  return characterFound;
};

export const getCharacter = (dataOriginal, idCard) => { // datos personaje por tarjeta
  let newList = {};
  for (let i = 0; i < dataOriginal.length; i++) {
    if (dataOriginal[i]["id"] === idCard) {
      newList = {
        info: {
          Nombre: dataOriginal[i].name,
          Estado: dataOriginal[i].status,
          Especie: dataOriginal[i].species,
          Genero: dataOriginal[i].gender,
          Origen: dataOriginal[i]["origin"].name,
          Locación: dataOriginal[i]["location"].name,
          "Episodios de aparición": dataOriginal[i]["episode"].length,
        },
        image: {
          url: dataOriginal[i].image,
        },
      };
    }
  }
  return newList;
};

export const sortData = (data, sortOrder) => { // ordenar a la az
   data.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  if (sortOrder !== 'asc') {
    return data.reverse();
  }
  return data;
};
