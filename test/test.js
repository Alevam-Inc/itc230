const expect = require("chai").expect;
const film = require("../lib/movies");

describe("Get film", function() {
 it("Returns the requested film", function() {
   const result = film.get("gojira");
   console.log(result);
   expect(result).to.deep.equal({
        title:"Gojira",
        year:"1954",
        country:"Japanese",
        director:"Ishiro Honda",
        studio:"Toho Pictures"});
 });
 
 it("Fails to return an existing film", function() {
   const result = film.get("fake");
   expect(result).to.be.undefined;
 });
});

describe("Add film", function() {
    it("Adds a new film", function() {
      const result = film.add({
      title:"War of the Worlds",
      year:"1953",
      country:"American",
      director:"Byron Haskin",
      studio:"Paramount Pictures"});
      console.log(result);
      expect(result.added).to.be.true;
    });
    
    it("Fails if the film already exists", function() {
      const result = film.add({
        title:"Gojira",
        year:"1954",
        country:"Japanese",
        director:"Ishiro Honda",
        studio:"Toho Pictures"});
      expect(result.added).to.be.false;
    });
  });

describe("Remove film", function() {
    it("Removes an existing film", function() {
        const result = film.remove("gojira");
        console.log(result);
        expect(result.removed).to.be.true;
    });

    it("Fails to remove a nonexistant book", function() {
      const result = film.remove("fake");
      expect(result.removed).to.be.false;
    });
});