// Import required modules
const fs = require('fs')
const path = require('path')
const { Pool, Client} = require('pg')
const config = require('./config.json')

// inputfile & target table
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
  await client.query('DROP TABLE IF EXISTS questions cascade');
  await client.query('CREATE TABLE questions (id int primary key, product_id int, body text, date_written bigint, asker_name varchar(200), asker_email varchar(200), reported int, helpful int)');
  await client.query(`COPY questions (id,product_id,body,date_written,asker_name, asker_email, reported, helpful)FROM '${questionsFile}' DELIMITER ','
  CSV HEADER`);
  console.log(answersFile);
  await client.query('DROP TABLE IF EXISTS answers cascade');
  await client.query('CREATE TABLE answers (id int primary key, question_id int references questions (id), body text, date_written bigint, answerer_name varchar(200), answerer_email varchar(200), reported int, helpful int)');
  await client.query(`COPY public.answers (id, question_id, body,date_written, answerer_name, answerer_email, reported, helpful)FROM '${answersFile}' DELIMITER ','
  CSV HEADER`);
  console.log(photosFile);
  await client.query('DROP TABLE IF EXISTS answers_photos cascade');
  await client.query('CREATE TABLE answers_photos (id int primary key, answer_id int references answers (id), url text)');
  await client.query(`COPY answers_photos (id, answer_id, url)FROM '${photosFile}' DELIMITER ','
  CSV HEADER`);
  return 'finished';
}

console.log(res);
res().then(res => {
  console.log('resolved and ending');
}
).catch(err => console.log('did not resolve, ', err));
client.end();
exports.client = client;