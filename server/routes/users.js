var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers')
var jwtVerify = require('../helpers/jwtVerify')

//Create user / signup
router.post('/signup', userControllers.createUser)

//Sign in
router.post('/signin', userControllers.signIn)

//Sign in with FB
router.post('/signinfb', userControllers.signInFB)

//Get all user, admin only
router.get('/', jwtVerify.verifyAdmin, userControllers.getUser)

//Delete a user
router.delete('/:id', jwtVerify.verifyAdmin, userControllers.deleteUser)

module.exports = router;
