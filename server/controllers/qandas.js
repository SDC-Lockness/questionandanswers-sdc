var models = require('../models');

module.exports = {
  //GET /qa/questions Retrieves a list of questions for a random product. This list does not include any reported questions.
  get: function (req, res) {
    const {product_id, page, count } = req.query;
    models.qandas.getAllQuestions(product_id)
      .then(result => res.send(result))
      .catch(err => console.log('did not work, ', err));

  },

  post: function (req, res) {

  },
  patch: function (req, res) {

  }


  // a function which handles posting a message to the database
};
