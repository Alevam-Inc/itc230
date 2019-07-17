'use strict'
    let catalog = [{
        title: "Gojira",
        year: "1954",
        country: "Japanese",
        director: "Ishiro Honda",
        studio: "Toho Pictures"
    },
    {
        title: "Jaws",
        year: "1975",
        country: "American",
        director: "Steven Spielberg",
        studio: "Universal Pictures"
    },
    {
        title: "Metropolis",
        year: "1927",
        country: "German",
        director: "Fritz Lang",
        studio: "Parufamet"
    },
    {
        title: "Evil Dead",
        year: "1981",
        country: "American",
        director: "Sam Raimi",
        studio: "NewLine Cinema"
    },
    {
        title: "Star Wars",
        year: "1977",
        country: "American",
        director: "George Lucas",
        studio: "20th Century Fox"
    }];


    exports.getAll = () => {
        return catalog;
    };
    
    exports.get = (title) => {
        return catalog.find((item) => {
            return item.title.toLowerCase() === title.toLowerCase();
        });
    };
    
    exports.remove = (title) => {
        // retain array length for later comparison after array modification
        const oldLength = catalog.length;
        catalog = catalog.filter((item) => {
            return item.title !== title;
        });
        // if old & new array lengths differ, item was removed
        return {removed: oldLength !== catalog.length, total: catalog.length };
    };
    
    exports.add = (newFilm) => {
        const oldLength = catalog.length;
        // use existing get() method to check if film already in our list
        let found = this.get(newFilm.title);
        if (!found) {
            catalog.push(newFilm);
        }
        // if old & new array lengths differ, item was added
        return {added: oldLength !== catalog.length, total: catalog.length };
    };