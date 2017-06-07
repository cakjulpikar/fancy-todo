var todoModel = require('../models/todo')
var ObjectId = require('mongodb').ObjectId

var createTodo = function(req,res) {
  console.log("Masuk createTodo");
  console.log(req.decoded.id);
  todoModel.create({
    userId : req.decoded.id,
    content : req.body.content,
    deadlineAt : req.body.deadlineAt
  },function(err,result) {
    if (err) {
      res.send(err)
      console.log("Error");
    } else {
      res.send(result)
    }
  })
}

var completedTodo = function(req,res) {
  todoModel.findOne({
    _id : ObjectId(req.params.id)
  }, function(err,result) {
    if (err) {
      res.send(err)
    } else {
      result.completed = true
      result.save(function(err,result) {
        if (err) {
          res.send(err)
        } else {
          res.send(result)
        }
      })
    }
  })
}

var deleteTodo = function(req,res) {
  todoModel.deleteOne({
    _id : ObjectId(req.params.id)
  },function(err) {
    if (err) {
      res.send(err)
    } else {
      res.send({msg: `Delete todo with id ${req.params.id} success`})
    }
  })
}

var updateTodo = function(req,res) {
  todoModel.findOne({
    _id : ObjectId(req.params.id)
  }, function(err,result) {
    if (err) {
      res.send(err)
    } else {
      result.content = req.body.content || result.content
      result.deadlineAt = req.body.deadlineAt || result.deadlineAt
      result.save(function(err,result) {
        if (err) {
          res.send(err)
        } else {
          res.send({msg: `Update content of todo with id ${req.params.id} success`})
        }
      })
    }
  })
}

var getTodo = function(req,res) {
  todoModel.find({
    userId : ObjectId(req.decoded.id)
  }, function(err,result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

module.exports = {
  createTodo,
  completedTodo,
  deleteTodo,
  updateTodo,
  getTodo
};
