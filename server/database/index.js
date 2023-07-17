// Import required modules
const fs = require('fs')
const path = require('path')
const { Pool, Client} = require('pg')
const config = require('./config.json')

// inputfile & target table
var productFile = '/Users/oscarcarvente/Desktop/qandadata/product.csv';
var questionsFile = '/Users/oscarcarvente/Desktop/qandadata/questions.csv';/// path.join(__dirname, './data/questions.csv');
var answersFile = '/Users/oscarcarvente/Desktop/qandadata/answers.csv';
var photosFile = '/Users/oscarcarvente/Desktop/qandadata/answers_photos.csv';

// Getting connectin parameters from config.json
const host = config.host
const user = config.user
const pw = config.pw
const db = config.db
const port = config.port
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`;

// Connecting to Database
const client = new Client({
  connectionString: conString,
})

client.connect()

// Execute Copy Function
 async function res() {
  // console.log()
  // await client.query('DROP TABLE IF EXISTS product cascade');
  // await client.query('CREATE TABLE product (id int serial primary key, name varchar(200), slogan text, description text, category varchar(200), default_price int)');
  // await client.query(`COPY product (id,name,slogan,description,category,default_price)FROM '${productFile}' DELIMITER ','
  // CSV HEADER`);
  // await client.query('DROP TABLE IF EXISTS questions cascade');
  // await client.query('CREATE TABLE questions (question_id int primary key, product_id int references product (id), question_body text, question_date bigint, asker_name varchar(200), asker_email varchar(200), reported int, question_helpfulness int)');
  // await client.query(`COPY questions (question_id,product_id,question_body,question_date,asker_name, asker_email, reported, question_helpfulness)FROM '${questionsFile}' DELIMITER ','
  // CSV HEADER`);
  // console.log(answersFile);
  // await client.query('DROP TABLE IF EXISTS answers cascade');
  // await client.query('CREATE TABLE answers (answer_id int serial primary key, question_id int references questions (question_id), body text, date bigint, answerer_name varchar(200), answerer_email varchar(200), reported int, helpfulness int)');
  // await client.query(`COPY answers (answer_id, question_id, body,date, answerer_name, answerer_email, reported, helpfulness)FROM '${answersFile}' DELIMITER ','
  // CSV HEADER`);
  // console.log(photosFile);
  // await client.query('DROP TABLE IF EXISTS answers_photos cascade');
  // await client.query('CREATE TABLE answers_photos (id int serial primary key, answer_id int references answers (id), url text)');
  // await client.query(`COPY answers_photos (id, answer_id, url)FROM '${photosFile}' DELIMITER ','
  // CSV HEADER`);
  return 'finished';
}

console.log(res);
res().then(res => {
  console.log('resolved the following, ', res);
  // client.end();

}
).catch(err => console.log('did not resolve, ', err));
exports.client = client;