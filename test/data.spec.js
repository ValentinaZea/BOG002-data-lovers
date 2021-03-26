import { searchByName,  } from '../src/data.js';  //getCharacter



describe('searchByName', () => {
  it('should be a function', () => {
    expect(typeof searchByName).toBe('function');
  });

  it("should throw TypeError when invoked with wrong argument types", () => {
    expect(() => searchByName()).toThrow(TypeError);
    expect(() => searchByName(0)).toThrow(TypeError);
    expect(() => searchByName(null, [])).toThrow(TypeError);
    expect(() => searchByName(0, 0)).toThrow(TypeError);
    expect(() => searchByName(2)).toThrow(TypeError);
  });

  it('should return "Arcade Alien" for "Arc"', () => {
    expect(searchByName("Arcade Alien", "Arc")).toBe("Arcade Alien");
  });
});


// describe('anotherExample', () => {
//   it('is a function', () => {
//     expect(typeof anotherExample).toBe('function');
//   });

//   it('returns `anotherExample`', () => {
//     expect(anotherExample()).toBe('OMG');
//   });
// });
