var jwt = require("jsonwebtoken"),
  twitterConfig = require("../config/twitter.config.js"),
  User = require("mongoose").model("User"),
  request = require("request"),
  expressJwt = require("express-jwt"),
  jwtSecret = require("../config/jwt.config.js"),
  errorHandler = require("./errorHandler");

var getOauthObject = function(user, twitterConfigurations) {
  var token = user.twitterProvider.token,
    tokenSecret = user.twitterProvider.tokenSecret;
  return {
    consumer_key: twitterConfigurations.consumerKey,
    consumer_secret: twitterConfigurations.consumerSecret,
    token: token,
    token_secret: tokenSecret
  };
};
var createToken = function(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    jwtSecret,
    {
      expiresIn: 60 * 120
    }
  );
};

var generateToken = function(req, res, next) {
  req.token = createToken(req.auth);
  return next();
};

var sendToken = function(req, res) {
  res.setHeader("x-auth-token", req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

var authenticate = expressJwt({
  secret: jwtSecret,
  requestProperty: "auth",
  getToken: function(r) {
    if (r.headers["x-auth-token"]) {
      return r.headers["x-auth-token"];
    }
    return null;
  }
});

var getCurrentUser = function(req, res, next) {
  User.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

var getOne = function(req, res) {
  var user = req.user.toObject();

  delete user["twitterProvider"];
  delete user["__v"];

  res.json(user);
};

var getTweets = function(req, res) {
  var user = req.user.toObject(),
    sinceIdQuery = req.query.maxId;
  var maxId;
  if (sinceIdQuery) {
    maxId = `?max_id=${sinceIdQuery}`;
  } else {
    maxId = "";
  }
  var oauth = getOauthObject(user, twitterConfig),
    url = `https://api.twitter.com/1.1/statuses/user_timeline.json${maxId}`;
  request.get({ url: url, oauth: oauth, json: true }, function(
    error,
    httpResponse,
    tweets
  ) {
    errorHandler(error, res);
    res.json(tweets);
  });
};

var postTweet = function(req, res) {
  var user = req.user.toObject(),
    status = req.body["status"],
    oauth = getOauthObject(user, twitterConfig),
    url = `https://api.twitter.com/1.1/statuses/update.json?status=${encodeURI(
      status
    )}`;
  request.post({ url: url, oauth: oauth, json: true }, function(
    error,
    httpResponse,
    tweet
  ) {
    errorHandler(error, res);
    if (tweet.errors) {
      return res.status(400).send({
        message: tweet.errors[0].message,
        code: tweet.errors[0].code
      });
    }
    res.json(tweet);
  });
};

module.exports = {
  generateToken,
  sendToken,
  authenticate,
  getCurrentUser,
  getOne,
  getTweets,
  postTweet
};