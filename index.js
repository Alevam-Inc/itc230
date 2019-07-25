'use strict'

const film = require("./lib/movies");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

app.get('/', (req,res) => {
  res.render('home', {catalog: film.getAll()});
 });

// send plain text response
app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About Page');
 });
 
 app.get('/remove', function(req,res){
  let result = film.remove(req.query.title);
  res.render('remove', {title: req.query.title, result: result });
 });

 // send content of 'home' view
 app.get('/detail', function(req,res){
  console.log(req.query)
  var found = film.get(req.query.title);
  res.render("detail", {
      title: req.query.title, 
      result: found
      }
  );
});

// handle POST
app.post('/detail', function(req,res){
  console.log(req.body)
  var found = film.get(req.body.title);
  res.render("detail", {title: req.body.title, result: found, catalog: film.getAll()});
});

app.get('/addform', (req,res) => {
  res.render('addform');
});

app.post('/add', (req,res) => {
  let title = req.body.title;
  let year = req.body.year;
  let country = req.body.country;
  let director = req.body.director;
  let studio = req.body.studio;
  let newObject = {title, year, country, director, studio}
  let result = film.add(newObject);
  res.render('add', {
      film: req.body,
      result: result
      });
});

 // define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

 app.listen(app.get('port'), () => {
  console.log('Express started'); 
 });