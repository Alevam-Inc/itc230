'use strict'
var Film = require("./models/movies");

// export MongoDb methods as promise functions
exports.getAll = () => {
    // find all documents 
    return Film.find({}, (err, result) => {
        // output error if one occurred
        if (err) {
            console.log(err);
        } else {
            // otherwise output the array of documents
            return result;
        }
    });
};

exports.get = (title) => {
    return Film.findOne({title}, (err, result) => {
        // output error if one occurred
        if (err) {
            console.log(err);
        } else {
            // otherwise output the array of documents
            return result;
        }
    });
};

exports.remove = (title) => {
    return Film.deleteOne({title}, (err, result) => {
        // output error if one occurred
        if (err) {
            console.log(err);
        } else {
            // otherwise output the array of documents
            return result;
        }
    });
};

exports.add = (newFilm) => {
    console.log(newFilm)
 //   var newFilm = {title, year, country, director, studio}
    return Film.update({
    'title':newFilm.title,
    'year':newFilm.year,
    'country':newFilm.country,
    'director':newFilm.director,
    'studio':newFilm.studio},
    newFilm, {upsert:true}, (err, result) => {
        if (err) return next(err);
        console.log(result);
    });
};