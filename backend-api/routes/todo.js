var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');

// Return all todo list items.
router.get('/', function(req, res, next) {
  Todo.find(function(err, todos) {
    if (err) return next(err);
    return res.status(200).json(todos);
  });
});

// Create a new todo list item.
router.post('/', function(req, res, next) {
  Todo.create(req.body, function(err, newTodo) {
    if (err) return next(err);
    return res.status(201).json(newTodo);
  });
});

// Update the todo list item.
router.put('/:id', function(req, res, next) {
  if (req.body !== null) {
    Todo.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, function(err, todo) {
      if (err) return next(err);
      return res.status(200).json(todo);
    });
  } else {
    return res.status(404).json();
  }
});

// Set all todo items completed.
router.put('/', function(req, res, next) {
  if (req.query.completed) {
    Todo.update({
      completed: false
    }, {
      completed: true
    }, {
      multi: true
    }, function(err) {
      if (err) return next(err);
      return res.status(200).json();
    });
  } else {
    return res.status(404).json();
  }
});

// Delete the todo list item.
router.delete('/:id', function(req, res, next) {
  Todo.remove({
    _id: req.params.id
  }, function(err) {
    if (err) return next(err);
    return res.status(204).json();
  });
});

// Delete all completed todo list items.
router.delete('/', function(req, res, next) {
  if (req.query.completed) {
    Todo.remove({
      completed: true
    }, function(err) {
      if (err) return next(err);
      return res.status(204).json();
    });
  } else {
    return res.status(404).json();
  }
});

module.exports = router;