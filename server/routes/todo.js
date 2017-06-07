var express = require('express');
var router = express.Router();
var todoControllers = require('../controllers/todoControllers')
var jwtVerify = require('../helpers/jwtVerify')

//create todo
router.post('/', jwtVerify.verifyToken , todoControllers.createTodo )

//delete a todo
router.delete('/:id', jwtVerify.verifyToken, todoControllers.deleteTodo)

//complete a todo
router.patch('/:id', jwtVerify.verifyToken, todoControllers.completedTodo)

//update content and deadline
router.put('/:id', jwtVerify.verifyToken, todoControllers.updateTodo)

//get todo base by user id
router.get('/', jwtVerify.verifyToken , todoControllers.getTodo)

module.exports = router;
