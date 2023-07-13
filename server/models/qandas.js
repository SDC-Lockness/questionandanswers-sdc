var db = require('../database');

module.exports = {
  getAll: function (callback) {
    // return new Promise ((resolve, reject) => {
      var queryString = 'Select * FROM movies';
      db.connection.query(queryString, function(err, results) {
        if (err) {
          callback(err);
        } else {
          callback(err, results);
        }
      })
    },


  create: function (params, callback) {
    console.log(params);
    var queryString = 'INSERT INTO movies (title, watched) VALUES (?, 0)'
    db.connection.query(queryString, params, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        callback(err,results);
      }
    });
  },
  update: function (params, callback) {
    var queryString = 'UPDATE movies, (SELECT id FROM movies WHERE title = ? ) AS newmovie SET movies.watched = ? WHERE movies.id = newmovie.id';
    db.connection.query(queryString, params, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        callback(err,results);
      }
    });
  }
};