import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '1s',
};
export default function () {
  let minProduct= 1000011*.90; // gives product_id at bottom 10%
  let maxProduct= 1000011;
  let product_id = Math.floor(Math.random() * (minProduct - maxProduct + 1) + minProduct);
  // const minQuestion = 3518963*90
  // const maxQuestion = 3518963
  // const question_id = Math.floor(Math.random() * (minQuestion - maxQuestion + 1) + minQuestion);
  // const questions = 'http://localhost:3001/qa/questions';
  // const answers = `http://localhost:3001/qa/questions/${question_id}/answers`

  const question = 'http://localhost:3001/qa/questions';


  const params = {

  };

  const payload = JSON.stringify({
      body: `Hello word I am posting question `,
      name: 'oscarvente',
      email: 'oc@gmail.com',
      product_id: Math.floor(Math.random() * (minProduct - maxProduct + 1) + minProduct)
    });
  // initial page load
  // http.get(questions, params);
  http.post(question, payload);
  // http.post(addQuestion)
  // http.post(addAnswer)
  // add a question
  // helpful an answer
  // report an answer
}