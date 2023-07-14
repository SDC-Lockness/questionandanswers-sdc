var db = require('../database');

module.exports = {
  getAllQuestions: async function (id) {
      var queryString = 'Select * FROM questions where reported = 0 and product_id = $1';
      var values = [id];
      let result = await db.client.query(queryString, values);
      result = result.rows;
      return result;
  },

  getRandomProduct: async function() {
    var queryString = 'SELECT * FROM product WHERE id >= (SELECT floor(random() * (SELECT max(id) FROM product))) ORDER BY id LIMIT 1';
    const result = await db.client.query(queryString);
    console.log('this is the result from query, ', result);
    return result;
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