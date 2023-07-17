var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
//GET /qa/questions
router.get('/questions', controller.qandas.getQuestions );
//GET /qa/questions/:question_id/answers
router.get('/questions/:question_id/answers', controller.qandas.getAnswers);
//POST /qa/questions
router.post('/questions', controller.qandas.postQuestion);
//POST /qa/questions/:question_id/answers
router.post('/questions/:question_id/answers', controller.qandas.postAnswer);
//PUT /qa/questions/:question_id/helpful
router.put('/questions/:question_id/helpful', controller.qandas.putHelpful);
router.put('/questions/:question_id/report', controller.qandas.putReport);
router.put('/answers/:answer_id/helpful', controller.qandas.putHelpfulAnswers);
router.put('/answers/:answer_id/report', controller.qandas.putReportAnswers)

module.exports = router;