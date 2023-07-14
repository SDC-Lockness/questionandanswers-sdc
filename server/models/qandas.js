var db = require('../database');

module.exports = {
  getAllQuestions: async function (id) {
      var queryString = 'Select * FROM questions where reported = 0 and product_id = $1' ;
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

  },
  update: function (params, callback) {

  }
};