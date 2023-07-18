let request = require('supertest');
const express = require('express');
let controllers = require('../controllers');
request = request('http://localhost:3000');
let {client} = require('../database/index.js');

// describe('Unit test controllers', () => {
//   test('get questions returns a list of questions, ', ()=> {
//     jest.mock()
//   })
// });

describe('GET /qa/questions', () => {
  let response, data;

  beforeAll(async () => {
    response =  await request
      .get('/qa/questions')
      .query({product_id: 23, page: 1, count: 10})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    data = response.body;
  });

  afterAll(async () =>{
    await client.end();
  })

  test('response has the product_id and results', () => {
    expect(data).toHaveProperty('product_id', "23");
    expect(data).toHaveProperty('results');
  });

  test('date for each result should be in the proper ISO format', () => {
    let resultArray = data.results;
    var result = resultArray[0];
    var date = result.question_date;
    expect(date).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);
  });

  test('reported should be false', () => {
    let resultArray = data.results;
    var result = resultArray[0];
    var reported = result.reported;
    expect(reported).toEqual(false);
  });
});
