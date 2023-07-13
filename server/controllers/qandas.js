var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.movies.getAll((err, results) => {
      if (err) {
        res.status(401);
      } else {
        res.send(results);
      }
    });
  },
  //   models.movies.getAll((err, result) => {
  //     if (err) {
  //       res.status(401);
  //     } else {
  //       res.send(result);
  //     }
  //   });
  // }, // a function which handles a get request for all messages
  post: function (req, res) {
    console.log('this is what you,', req.body);
    var params = [req.body['title']];
    models.movies.create(params, (err, result) => {
      if(err) {
        res.status(401);
      } else {
        res.send(result.id);
      }
    });
  },
  patch: function (req, res) {
    var params = [req.body['title'], req.body['watched']];
    models.movies.update(params, (err, result) => {
      if (err) {
        res.status(401);
      } else {
        res.send(result);
      }
    });
  }


  // a function which handles posting a message to the database
};
