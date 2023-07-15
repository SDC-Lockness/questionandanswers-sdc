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
      var queryString = 'SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE reported=0 AND product_id = $1';
      //Execution Time: 2119.579 ms
      var values = [product_id];
      let questions = await db.client.query(queryString, values);
      let answers = await grabAsnwers(questions.rows);
      let photos = await grabPhotos(answers);
      return formatQuestions(questions.rows, answers, photos, product_id);

  },


  getAnswers: async function (question_id) {
    var queryString = 'Select * FROM answers where question_id = $1' ;
    var values = [question_id];
    let result = await db.client.query(queryString, values);
    return result.rows;
  },

  getPhotos: async function (answer_id) {
    var queryString = 'Select * FROM answers_photos where answer_id = $1' ;
    var values = [answer_id];
    let result = await db.client.query(queryString, values);
    result = result.rows;
    return result;
  },

};
var grabPhotos = async (answers) => {
  var result = [];
  for(var i = 0; i < answers.length; i ++) {
    var answer_id = answers[i].answer_id;
    var photos = await module.exports.getPhotos(answer_id);
    result = result.concat(photos);
  }
  return result;
}
var grabAsnwers = async (questions) => {
  var results = [];
  for(var i = 0; i < questions.length; i++) {
    var question_id = questions[i].question_id;
    results = results.concat(await module.exports.getAnswers(question_id));
  }
  return results;
}
var formatQuestions = (questions, answers, photos, product_id) => {
  var results = [];
  // go through each object
  for (var i = 0; i < questions.length; i ++ ) {
    var question = questions[i];
    question['question_date'] = formatDate(question.question_date);
    question['reported'] = question.reported ? true: false;
    question['answers'] = {}
    for(var j = 0; j < answers.length; j ++ ) {

      if (answers[i].question_id === question.question_id) {
        var answer_id = Number(answers[i].answer_id);
        question['answers'][answer_id] = {
          id: answers[i].answer_id,
          body:answers[i].body,
          date: formatDate(answers[i].date),
          answerer_name:answers[i].answerer_name,
          helpfulness: answers[i].helpful,
          photos: []
        }
        for (var k = 0; k < photos.length; k++) {
          if(photos[i].answer_id === answers[i].answer_id) {
            question['answers'][answer_id]['photos'].push(photos[i]['url']);
          }
        }
      }

    }
    results.push(question);
  }

  return {product_id: product_id, results: results};
}


const formatDate = (date) => {
  if(date.includes('-')) {
    return date;
  }
  const dateObject = new Date(Number(date));
  return dateObject.toISOString();
}
  //   if (!results[question.question_id]) {
  //     const questionDateObject = new Date(Number(question.question_date));
  //     const answerDateObject = new Date(Number(question.date));
  //     const answer_id = question.answer_id.toString();
  //     results[question.question_id] = {
  //       question_id: question.question_id,
  //       question_body: question.question_body,
  //       question_date: questionDateObject.toISOString(),
  //       asker_name: question.asker_name,
  //       question_helpfulness: question.question_helpfulness,
  //       reported: question.reported ? true: false,
  //     }
  //     results[question.question_id]['answers'] = {};
  //     results[question.question_id]['answers'][answer_id] = {
  //       id: question.answer_id,
  //       body: question.body,
  //       date: answerDateObject.toISOString(),
  //       answerer_name: question.answerer_name,
  //       helpful: question.helpful,
  //       photos: [
  //         question.url
  //       ]
  //     }
  //   } else {
  //     const answerDateObject = new Date(Number(question.date));
  //     let currentAnswers = results[question.question_id]['answers']
  //     if (!currentAnswers[question.answer_id]) {
  //       currentAnswers[question.answer_id] = {
  //         id: question.answer_id,
  //         body: question.body,
  //         date: answerDateObject.toISOString(),
  //         answerer_name: question.answerer_name,
  //         helpful: question.helpful,
  //         photos: [
  //           question.url
  //         ]
  //       }
  //     } else {
  //       let currentAnswer = currentAnswers[question.answer_id];
  //       currentAnswer['photos'].push(question.url);
  //     }
  //   }
  // }

  // object that has question_id as keys and the object as value;
  // copy down the question_id, question_date,..., if answers does not exist

  // create an answers : with an object that makes key the id and the values an object with
   // if it does exist move on to answers by creating an object with the answer info
  // and setting it to the answer_id
  // answer_id (renamed to id) helpful, if no photos exist create a photos array and push the photos url.
  // if phoots does exist then push the url


  // get the values of the resulting array
  // send back with product id and results attribute
