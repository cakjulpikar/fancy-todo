var jwt = require('jsonwebtoken')
require('dotenv').config()

var verifyToken = function(req,res,next) {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, function(err,decoded) {
    if (err) {
      res.send(err)
    } else {
      req.decoded = decoded
      next()
    }
  })
}

var verifyAdmin = function(req,res,next) {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.send(err)
    } else {
      if (decoded.name == 'adminbackoffice') {
        req.decoded = decoded
        next()
      } else {
        res.send({msg: 'You are not admin back office, sorry'})
      }
    }
  })
}

module.exports = {
  verifyToken,
  verifyAdmin
};
