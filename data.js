// estas funciones son de ejemplo

export const example = () => {
  return "example";
};

export const anotherExample = () => {
  return "OMG";
};

export const searchByName = (dataOriginal, input) => {
  let characterFound = [];
  dataOriginal.forEach((element) => {
    if (element.name.toLowerCase().includes(input))
      characterFound.push(element);
  });
  return characterFound;
};

export const getCharacter = (dataOriginal, idCard) => {
  for (let i = 0; i < dataOriginal.length; i++) {
    if (dataOriginal[i]["id"] === idCard) {
      delete dataOriginal[i].id;
      delete dataOriginal[i].created;
      delete dataOriginal[i].url;
      delete dataOriginal[i].image;
      delete dataOriginal[i].type;
      let newLocation = dataOriginal[i]["location"].name;
      Object.defineProperty(dataOriginal[i], "location", {
        value: newLocation,
      });
      let newOrigin = dataOriginal[i]["origin"].name;
      Object.defineProperty(dataOriginal[i], "origin", { value: newOrigin });
      let lengthEpisode = dataOriginal[i]["episode"].length;
      Object.defineProperty(dataOriginal[i], "episode", {
        value: lengthEpisode,
      });
      return dataOriginal[i];

      //   let keys= Object.keys(dataOriginal[i])
      //  console.log(keys)
      //   switch (keys) {
      //     case 0:
      //       delete dataOriginal[i].id;
      //       break;
      //     case 11:
      //       delete dataOriginal[i].created;
      //       break;
      //     case 10:
      //       delete dataOriginal[i].url;
      //       break;
      //     case 8:
      //       delete dataOriginal[i].image;
      //       console("ingreso  a  image");
      //       break;
      //     default:
      //     console.log(dataOriginal[i]);
      //   }

      //console.log(Object.keys(dataOriginal[i]));
    }
  }
};
