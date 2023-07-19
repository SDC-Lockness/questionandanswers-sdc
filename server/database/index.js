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
  // await client.query('CREATE TABLE IF NOT EXISTS product (id serial primary key, name varchar(200), slogan text, description text, category varchar(200), default_price int)');
  // await client.query(`COPY product (id,name,slogan,description,category,default_price)FROM '${productFile}' DELIMITER ','
  // CSV HEADER`);
  // await client.query('CREATE TABLE IF NOT EXISTS questions (question_id serial primary key, product_id int references product (id), question_body text, question_date bigint, asker_name varchar(200), asker_email varchar(200), reported int NOT NULL DEFAULT 0, question_helpfulness int NOT NULL DEFAULT 0)');
  // await client.query(`COPY questions (question_id,product_id,question_body,question_date,asker_name, asker_email, reported, question_helpfulness)FROM '${questionsFile}' DELIMITER ','
  // CSV HEADER`);
  // await client.query('CREATE TABLE IF NOT EXISTS answers (answer_id serial primary key, question_id int references questions (question_id), body text, date bigint, answerer_name varchar(200), answerer_email varchar(200), reported int NOT NULL DEFAULT 0, helpfulness int NOT NULL DEFAULT 0)');
  // await client.query(`COPY answers (answer_id, question_id, body,date, answerer_name, answerer_email, reported, helpfulness)FROM '${answersFile}' DELIMITER ','
  // CSV HEADER`);
  // await client.query('CREATE TABLE IF NOT EXISTS answers_photos (id serial primary key, answer_id int references answers (answer_id), url text)');
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