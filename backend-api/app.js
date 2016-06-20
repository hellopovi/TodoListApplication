var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var config = require('./config/config.js');

// Connecting to MONGODB.
mongoose.connect(config.MONGODB_URI, function(err) {
  if (err) {
    console.log('Failed connecting to the database: ', err);
  } else {
    console.log("Connected successfully to MongoDB.")
  }
});

var app = express();
var todo = require('./routes/todo');

// Adding body parsing middleware
app.use(bodyParser.json());

// Enabling Cross-origin resource sharing
app.use(cors());

// Setting routes.
app.use('/', express.static('public'));
app.use('/todo', todo);

// Disabling EXPRESSJS header
app.disable('x-powered-by');

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler.
// Will print stacktrace.
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
      .json({
        'error': {
          message: err.message
        }
      });
  });
}

// Production error handler.
// No stacktraces leaked to user.
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .json({
      'error': {
        message: err.message
      }
    });
});

module.exports = app;