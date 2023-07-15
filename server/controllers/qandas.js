var models = require('../models');

module.exports = {
  //GET /qa/questions Retrieves a list of questions for a random product. This list does not include any reported questions.
  getQuestions: function (req, res) {
    const {product_id, page, count } = req.query;
    models.qandas.getFormattedQuestions(product_id, page, count)
      .then(result => res.send(result))
      .catch(err => console.log('get questions did not work, ', err));

  },

  getAnswers: function (req, res) {
    const {question_id} = req.params;
    const {page, count} = req.query;
    models.qandas.getFormattedAnswers(question_id, page, count)
      .then(result => res.send(result))
      .catch(err => console.log('get answers did not work, ', err));

  },

  getPhotos: function (req, res) {
    const {answer_id} = req.params;
    models.qandas.getPhotos(answer_id)
      .then(result => res.send(result))
      .catch(err => console.log('get answers did not work, ', err));

  },




  postQuestion: function (req, res) {
    models.qandas.postQuestion(req.body)
      .then(result => res.send(result))
      .catch(err => console.log('post questions did not work ', err))
  },
  patch: function (req, res) {

  }


  // a function which handles posting a message to the database
};
