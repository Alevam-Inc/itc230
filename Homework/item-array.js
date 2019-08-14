    let catalog = [{
        title: "Gojira",
        year: "1954",
        country: "Japanese",
        director: "Ishiro Honda",
        studio: "Toho Pictures"
    },{
        title: "Jaws",
        year: "1975",
        country: "American",
        director: "Steven Speilburg",
        studio: "Universal Pictures"
    },{
        title: "Metropolis",
        year: "1927",
        country: "German",
        director: "Fritz Lang",
        studio: "Parufamet"
    },{
        title: "Evil Dead",
        year: "1981",
        country: "American",
        director: "Sam Raimi",
        studio: "NewLine Cinema"
    },{
        title: "Star Wars",
        year: "1977",
        country: "American",
        director: "George Lucas",
        studio: "20th Century Fox"
    }];

    const http = require("http");
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let found = catalog.find((film) => {
                return film.title === 'Gojira';});
            res.end(found.title + " is a " + found.year + " " + found.country + " film directed by " + found.director + " and released by " + found.studio + ".");
            break;
    }

}).listen(process.env.PORT || 3000);