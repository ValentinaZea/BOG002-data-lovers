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
