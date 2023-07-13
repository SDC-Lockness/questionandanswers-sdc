const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});
let productSchema = mongoose.Schema({
  id: Number,
  name: String,
  questions: [{ type: Schema.Types.ObjectId, ref: 'Questions' }]
});

let questionSchema = mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: { type: Date, default: Date.now },
  asker_name: String,
  question_helpfulness: Number,
  reported: {type:Boolean, default: false},
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answers' }]
});
let answersSchema = mongoose.Schema({
  id: Number,
  body: String,
  date: { type: Date, default: Date.now },
  answerer_name: String,
  helpfulness: Number,
  photos: [{type:String}]
});

let Product = mongoose.model('Product', productSchema);
let Question = mongoose.model('Question', questionSchema);
let Answers = mongoose.model('Answers', questionSchema);