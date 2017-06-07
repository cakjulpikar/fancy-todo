var mongoose = require('mongoose')
var Schema = mongoose.Schema

var todoSchema = new mongoose.Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  content : 'String',
  completed : {
    type : 'Boolean',
    default : false
  },
  createdAt : {
    type : 'Date',
    default : Date.now,
    required : true
  },
  deadlineAt : 'Date'
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;
