import { searchByName, getCharacter, sortData, filterDataCategories } from '../src/data.js';  //getCharacter

const data = [{"id": 23,"name": "Arcade Alien"},{"id": 29,"name": "Baby Legs"},{"id": 6,"name": "Abadango Cluster Princess"},{"id": 29,"name": "Baby Legs"}]
const filterData = [{"name": "Mrs. Poopybutthole","status": "Alive","species": "Poopybutthole","gender": "Female"}, {"name": "Stair Goblin","status": "Alive","species": "Alien",
"gender": "Genderless"}, {"name": "Unity","status": "Alive","species": "Alien","gender": "Genderless"}];
const filter = {status: "Alive", gender: "Genderless", species: "Alien"};
const emptyFilter = {};

describe('searchByName', () => {
  it('should be a function', () => {
    expect(typeof searchByName).toBe('function');
  });

  // it('should return the corresponding data of the character', () => {
  //   expect(searchByName(data, "B")).toMatchObject([{"id": 29,"name": "Baby Legs"}, {"id": 29,"name": "Baby Legs"}]);
  // });

});  

describe('getCharacter', () => {
  it('should be a function', () => {
    expect(typeof getCharacter).toBe('function');
  });

  it('should return {image:{url:"https://raw.githubusercontent.com/Laboratoria/rick-and-morty-images/master/images/2.jpeg"}, info:{Episodios de aparición: 31, Especie: "Human", Estado: "Alive", Genero: "Male", Locación: "Earth (Replacement Dimension)", Nombre: "Morty Smith", Origen: "Earth (C-137)"}}', () => {
    expect(getCharacter(2)).toMatchObject({image:{url:"https://raw.githubusercontent.com/Laboratoria/rick-and-morty-images/master/images/2.jpeg"}, info:{"Episodios de aparición": 31, Especie: "Human", Estado: "Alive", Genero: "Male", Locación: "Earth (Replacement Dimension)", Nombre: "Morty Smith", Origen: "Earth (C-137)"}});
  });
});

describe('sortData', () => {
  it('should be a function', () => {
    expect(typeof sortData).toBe('function');
  });

  it('should return sorted data from a-z', () => {
    expect(sortData(data, "asc")).toMatchObject(
      [{"id": 6,"name": "Abadango Cluster Princess"},{"id": 23,"name": "Arcade Alien"},{"id": 29,"name": "Baby Legs"},{"id": 29,"name": "Baby Legs"}]
    );
  });

  it('should return sorted data from z-a', () => {
    expect(sortData(data, "desc")).toMatchObject(
      [{"id": 29,"name": "Baby Legs"},{"id": 29,"name": "Baby Legs"},{"id": 23,"name": "Arcade Alien"},{"id": 6,"name": "Abadango Cluster Princess"}]
    );
  });

  it('should return sorted data z-a(leave it the same)', () => {
    expect(sortData(data, "desc")).toMatchObject(
      [{"id": 29,"name": "Baby Legs"}, {"id": 29,"name": "Baby Legs"},{"id": 23,"name": "Arcade Alien"},{"id": 6,"name": "Abadango Cluster Princess"}]
    );
  });
});

describe('filterDataCategories', () =>{
  it('should be a function', () => {
    expect(typeof filterDataCategories).toBe('function');
  });

  it('should return filtered characters', () => {
    expect(filterDataCategories(filterData, filter)).toMatchObject(
      [{"name": "Stair Goblin","status": "Alive","species": "Alien","gender": "Genderless"}, {"name": "Unity","status": "Alive","species": "Alien","gender": "Genderless"}] );
  });

  it('should return filtered characters', () => {
    expect(filterDataCategories(filterData, emptyFilter)).toMatchObject(
      [{"name": "Mrs. Poopybutthole","status": "Alive","species": "Poopybutthole","gender": "Female"}, {"name": "Stair Goblin","status": "Alive","species": "Alien",
      "gender": "Genderless"}, {"name": "Unity","status": "Alive","species": "Alien","gender": "Genderless"}] );
  });

});




