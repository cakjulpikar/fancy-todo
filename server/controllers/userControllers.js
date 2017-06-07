var hash = require('object-hash')
var userModel = require('../models/user')
var jwt = require('jsonwebtoken')
var ObjectId = require('mongodb').ObjectId
require('dotenv').config()

var createUser = function(req,res) {
  userModel.create({
    name : req.body.name,
    username : req.body.username,
    password : hash(req.body.password),
    email : req.body.email
  }, function(err,result) {
    if (err) {
      res.send(err)
      console.log(err);
    } else {
      res.send(result)
    }
  })
}

var signIn = function(req,res) {
  userModel.findOne({
    $or: [{
      username : req.body.identity
    },{
      email : req.body.identity
    }]
  }, function(err,result) {
    if (result == null) {
      res.send({msg: 'Username or email not found'})
    } else if (result != null){
      if (result.password == hash(req.body.password)) {
        var token = jwt.sign({
          id : result._id,
          name : result.name
        },process.env.JWT_SECRET, {expiresIn: '1h'})
        res.send({token : token})
      } else {
        res.send({msg: 'Username or email dont match with password'})
      }
    }
  })
}

var signInFB = function(req,res) {
  userModel.findOne({
    email : req.body.email
  },function(err,resultFind) {
    if (resultFind == null) {
      userModel.create({
        email : req.body.email,
        name : req.body.name
      },function(err,resultCreate) {
        if (err) {
          res.send(err)
        } else {
          var token = jwt.sign({
            _id : resultCreate._id
          }, process.env.JWT_SECRET, {expiresIn: '1h'})
          res.send({token : token})
        }
      })
    } else if (resultFind != null){
      var token = jwt.sign({
        _id : resultFind._id
      }, process.env.JWT_SECRET, {expiresIn: '1h'})
      res.send({token : token})
    }
  })
}

var getUser = function(req,res) {
  userModel.find({}, function(err,result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

var deleteUser = function(req,res) {
  userModel.deleteOne({
    _id : ObjectId(req.params.id)
  }, function(err) {
    if (err) {
      res.send(err)
    } else {
      res.send(`Delete user with id ${req.params.id}`)
    }
  })
}

module.exports = {
  createUser,
  signIn,
  signInFB,
  getUser,
  deleteUser
};
