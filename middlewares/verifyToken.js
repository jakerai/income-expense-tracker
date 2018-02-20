var express = require('express');
var jwt = require('jsonwebtoken'); // sign with default (HMAC SHA256)
var config = require('../backend/config/config');
var app = express();

app.set('secret',config.secret);

//middleware to verify token for us
module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) { //failed verification.
                return res.json({"error": true});
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).send({
            "error": true,
            "message":"Not Authorized"
        });
    }
}


