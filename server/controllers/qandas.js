var models = require('../models');

module.exports = {
  //GET /qa/questions Retrieves a list of questions for a random product. This list does not include any reported questions.
  getQuestions: function (req, res) {
    const {product_id, page, count } = req.query;
    console.log('we here, ', req.query);
    models.qandas.getFormattedQuestions(product_id, page, count)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err));

  },

  getAnswers: function (req, res) {
    const {question_id} = req.params;
    const {page, count} = req.query;
    models.qandas.getFormattedAnswers(question_id, page, count)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err));

  },

  getPhotos: function (req, res) {
    const {answer_id} = req.params;
    models.qandas.getPhotos(answer_id)
      .then(result => res.send(result))
      .catch(err => res.status(400).send(err));

  },




  postQuestion: function (req, res) {
    models.qandas.postQuestion(req.body)
      .then(result => res.status(201).send())
      .catch(err => console.log('post questions did not work ', err))
  },

  postAnswer: function (req, res) {
    const {question_id} = req.params;
    const {body, answerer_name, email, photos} = req.body
    models.qandas.postAnswer(question_id, body, answerer_name, email)
      .then(answer_id => {return models.qandas.postPhotos(answer_id, photos)})
      .then(result=> res.status(201).send(result))
      .catch(err => res.status(201).send(err))
  },

  putHelpful: function (req, res) {
    const{question_id} = req.params;
    console.log(question_id);
    models.qandas.putHelpful(question_id)
      .then(result => res.sendStatus(204))
      .catch(err => res.status(400).send(err));
  },

  putReport: function (req, res) {
    const{question_id} = req.params;
    models.qandas.putReport(question_id)
      .then(result => res.sendStatus(204))
      .catch(err => res.status(400).send(err));
  },

  putHelpfulAnswers: function (req, res) {
    const{answer_id} = req.params;
    console.log(answer_id);
    models.qandas.putHelpfulAnswers(answer_id)
      .then(result => res.sendStatus(204))
      .catch(err => res.status(400).send(err));
  },

  putReportAnswers: function (req, res) {
    const{answer_id} = req.params;
    models.qandas.putReportAnswers(answer_id)
      .then(result => res.sendStatus(204))
      .catch(err => res.status(400).send(err));
  }
};
