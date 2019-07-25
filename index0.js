
const movies = require("./lib/movies.js");
const http = require("http");
const querystring = require('querystring');
http.createServer((req,res) => {
  console.log(req.url);
  let url = req.url.split("?");
  console.log(url);
  let path = url[0].toLowerCase();
  let queryParams = querystring.parse(url[1]);
  console.log(queryParams);
  switch(path) {
    case '/':   
   const fs = require("fs");
   fs.readFile("public/home.html", (err, data) => {
     if (err) return console.error(err);
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(data.toString());
  });
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
    case '/all':
      let allFound = movies.getAll()
      console.log(allFound);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(allFound));
      break;
    case '/detail':
      let found = movies.getItem(queryParams.title)
      console.log(found);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end((found) ? JSON.stringify(found) : "Title Not found");
      break;
    case '/remove':
      let removeFound = movies.removeItem(queryParams.title)
      console.log(removeFound);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let strTitle = url
      strTitle = strTitle.toString().replace('/remove,title=','')
      res.end('You have removed: ' + strTitle);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
    }
}).listen(process.env.PORT || 3000);