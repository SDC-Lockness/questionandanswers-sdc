var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
//GET /qa/questions
router.get('/questions', controller.qandas.get );
//GET /qa/questions/:question_id/answers
router.get('/questions/:question_id/answers', );
//POST /qa/questions
router.post('/questions', );
//POST /qa/questions/:question_id/answers
router.post('/questions/:question_id/answers', );
//PUT /qa/questions/:question_id/helpful
router.put('/questions/:question_id/helpful', )
router.put('/questions/:question_id/report')
router.put('/answers/:answer_id/helpful')
router.put('/answers/:answer_id/report')

module.exports = router;