var db = require('../database');

module.exports = {
  getRandomProduct: async function() {
    var queryString = 'SELECT * FROM product WHERE id >= (SELECT floor(random() * (SELECT max(id) FROM product))) ORDER BY id LIMIT 1';

    const result = await db.client.query(queryString);
    console.log('this is the result from query, ', result);
    return result;
  },

  getQuestions: async function (product_id) {
      // var queryString = 'Select * FROM questions where reported = 0 and product_id = $1' ;
      var queryString = 'SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported, a.answer_id, a.body, a.date, a.answerer_name, a.helpful, p.id, p.url FROM product pr JOIN questions q ON q.product_id = pr.id JOIN answers a ON a.question_id = q.question_id JOIN answers_photos p ON p.answer_id = a.answer_id WHERE pr.id = $1;'
      //Execution Time: 2119.579 ms
      var values = [product_id];
      let result = await db.client.query(queryString, values);
      return result;
  },


  getAnswers: async function (question_id) {
    var queryString = 'Select * FROM answers where question_id = $1' ;
    var values = [question_id];
    let result = await db.client.query(queryString, values);
    return result.rows;
  },

  getPhotos: async function (answer_id) {
    var queryString = 'Select * FROM photos where answer_id = $1' ;
    var values = [answer_id];
    let result = await db.client.query(queryString, values);
    result = result.rows;
    return result;
  },

};