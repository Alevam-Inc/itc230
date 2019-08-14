'use strict'

const Film = require("./movies");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());

const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");



app.get('/', (req,res) => {
  Film.getAll().then((items) => {
    console.log(items)
    //res.render('home',{films: items});
    res.render('home-test',{films: JSON.stringify(items)}); 
  }).catch((err) =>{
    return next(err);
  });
 });

// send plain text response
app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About Page');
 });
 
 app.get('/remove', function(req,res){
  let result = Film.remove(req.query.id);
  res.render('remove', {title: req.query.title, result: result });
 });

 // send content of 'home' view
 app.get('/detail', function(req,res){
   Film.get(req.query.title).then((result) =>{
     console.log(result)
    res.render("detail", {
      title: req.query.title, 
      result: result
      });
   });
  
});

// handle POST
app.post('/detail', function(req,res){
  console.log(req.body)
  var found = film.get(req.body.title);
  res.render("detail", {title: req.body.title, result: found, films: film.getAll()});
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
  console.log(req.body)
  let result = Film.add(req.body);
  console.log(result)
  res.render('add', {
      film: req.body,
      result: result
      });
});

//API routes
app.get('/api/movies', (req,res) => {
  Film.getAll().then((items) => {
    res.json(items); 
  }).catch((err) =>{
    return next(err);
  });
 });

 app.get('/api/movies/:title', function(req,res){
  Film.get(req.params.title).then((result) =>{
    console.log(result)
   res.json(result);
  });
});

app.get('/api/movies/remove/:id', function(req,res){
   Film.remove(req.params.id).then((item) =>{
     res.json(item)
   });
});

app.post('/api/movies/add/', function(req,res) {
    Film.add(req.body).then((result) =>{
        console.log(result);
        if (result.upserted) {
          res.json({"_id": result.upserted[0]._id})
        } else {
          res.json({});
        }
    })
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