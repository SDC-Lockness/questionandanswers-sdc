var db = require('../database');

module.exports = {
  getRandomProduct: async function() {
    var queryString = 'SELECT * FROM product WHERE id >= (SELECT floor(random() * (SELECT max(id) FROM product))) ORDER BY id LIMIT 1';
    const result = await db.client.query(queryString);
    return result;
  },

  getFormattedQuestions: async function (product_id, page, count) {
    console.log('here, ',  product_id);
      let questions = await this.getQuestions(product_id, page,count);
      let answers = await getManyAnswers(questions);
      let photos = await grabPhotos(answers);
      var results = formatQuestions(questions, answers, photos, product_id);
      return {product_id: product_id, results: results};

  },

  getFormattedAnswers: async function(question_id, page, count) {
    let answers = await this.getAnswers(question_id, page, count);
    let photos = await grabPhotos(answers);
    let results = formatAnswers(answers, photos);
    page = page || 1;
    count = count || 5;
    results.slice((page-1)*count,page*count);
    return {
      question:question_id,
      page: page,
      count: count,
      results: results
    }
  },

  getQuestions: async function (product_id, page, count )  {
    var queryString = 'SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE reported=0 AND product_id = $1 LIMIT $2 OFFSET $3';
      //Execution Time: 2119.579 ms
      var values = [product_id, count, (page*count - count)];
      let questions = await db.client.query(queryString, values);
      console.log('questions retrieved, ', questions);
      return questions.rows;
  },
  getAnswers: async function (question_id) {
    var queryString = 'Select answer_id, question_id, body, date, answerer_name, helpfulness FROM answers where reported=0 AND question_id = $1' ;
    var values = [question_id];
    let answers = await db.client.query(queryString, values);
    return answers.rows;
  },

  getPhotos: async function (answer_id) {
    var queryString = 'Select * FROM answers_photos where answer_id = $1' ;
    var values = [answer_id];
    let result = await db.client.query(queryString, values);
    result = result.rows;
    return result;
  },

  postQuestion: async function({body, name, email, product_id}) {
    var queryString = 'INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)';
    var currentTime = Date.now();
    var values = [product_id, body, currentTime, name, email];
    let result = await db.client.query(queryString, values);
    return result;
  },
  postAnswer: async function(question_id, body, answerer_name, email) {

    var queryString = 'INSERT INTO answers(question_id, body, date, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5)';
    var currentTime = Date.now();
    var values = [question_id, body, currentTime, answerer_name, email];
    let result = await db.client.query(queryString, values);
    let answer_id = await db.client.query('Select max(answer_id) from answers');
    return answer_id.rows[0];
  },

  postPhotos: async function({max}, urls) {

    var queryString = 'INSERT INTO answers_photos (answer_id, url) VALUES ($1, $2)';
    for (var i = 0; i < urls.length; i++) {
      var photo = urls[i]
      var values = [max, photo];
      let result = await db.client.query(queryString, values);
    }

    return '201';
  },
  putHelpful: async function(question_id) {
    var queryString = 'UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = $1'
    var values = [question_id];
    var result = await db.client.query(queryString, values);
    return result;
  },

  putReport: async function(question_id) {
    var queryString = 'UPDATE questions SET reported = 1 WHERE question_id = $1'
    var values = [question_id];
    var result = await db.client.query(queryString, values);
    return result;
  },

  putHelpfulAnswers: async function(answer_id) {
    var queryString = 'UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1'
    var values = [answer_id];
    var result = await db.client.query(queryString, values);
    return result;
  },

  putReportAnswers: async function(answer_id) {
    var queryString = 'UPDATE answers SET reported = 1 WHERE answer_id = $1'
    var values = [answer_id];
    var result = await db.client.query(queryString, values);
    return result;
  },


};

var formatAnswers = (answers, photos) => {
  var photoList = {};
  for (var i = 0; i < photos.length; i++) {
    const photo = photos[i]
    const {id, answer_id, url} = photo;
    const newPhotoObject = {
      id:id,
      url:url
    };
    if (answer_id in photoList) {
      photoList[answer_id].push(newPhotoObject)
    } else {
      photoList[answer_id] = [newPhotoObject];
    }
  }
  for (var j = 0; j < answers.length; j ++ ) {
    const answer = answers[j];
    const{answer_id, body, date, answerer_name, helpfulness} = answer;
    answers[j] = {
      answer_id: answer_id,
      body: body,
      date: formatDate(date),
      answerer_name: answerer_name,
      helpfulness: helpfulness,
      photos: answer_id in photoList ? photoList[answer_id] : []
    }

  }
  return answers;
}
var grabPhotos = async (answers) => {
  var promises = [];
  for(var i = 0; i < answers.length; i ++) {
    var answer_id = answers[i].answer_id;
    promises.push(module.exports.getPhotos(answer_id));
  }
  var result = await Promise.all(promises);
  return result.flat();
}
var getManyAnswers =  async (questions) => {
  var promises = [];
  for(var i = 0; i < questions.length; i++) {
    var question_id = questions[i].question_id;
    promises.push(module.exports.getAnswers(question_id))
  }
  var results = await Promise.all(promises)
  return results.flat();
}

const formatDate = (date) => {
  if(date.includes('-')) {
    return date;
  }
  const dateObject = new Date(Number(date));
  return dateObject.toISOString();
}

var formatQuestions = (questions, answers, photos, product_id) => {
  let photoList = {};
  for(var i = 0; i < photos.length; i++) {
    var photoObject = photos[i];
    if (photoObject.answer_id in photoList) {
      photoList[photoObject.answer_id].push(photoObject.url)
    } else {
      photoList[photoObject.answer_id] = [photoObject.url];
    }
  }
  let answerList = {};
  for(var j = 0; j < answers.length; j++) {
    var answersObject = answers[j];
    const {answer_id, question_id, body, date, answerer_name, helpfulness} = answersObject;
    if (!(question_id in answerList)) {
      answerList[question_id] = {};
    }
    answerList[question_id][answer_id] = {
        id: answer_id,
        body: body,
        date: formatDate(date),
        answerer_name: answerer_name,
        helpfulness: helpfulness,
        photos: answer_id in photoList ? photoList[answer_id] : []
    };
  }

  for(var k = 0; k < questions.length; k++) {
    var question = questions[k];
    const {question_id, question_date} = question;
    question["question_date"] = formatDate(question_date);
    question["reported"] = false;
    question['answers'] = question_id in answerList ? answerList[question_id]: {};
  }
  return questions;
}
