var Movie = require('../models/movies.js');

Movie.countDocuments((err, result) => {
    console.log(result);
});

Movie.find({}, (err, result) =>{
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});