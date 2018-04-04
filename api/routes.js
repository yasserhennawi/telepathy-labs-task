var passport = require("passport"),
  express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  request = require("request"),
  twitterConfig = require("../config/twitter.config.js"),
  errorHandler = require("../helpers/errorHandler"),
  helpers = require("../helpers/routes");

module.exports = function(app) {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  router.route("/auth/twitter/reverse").post(function(req, res) {
    const options = {
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        oauth_callback: "http://localhost:3000",
        consumer_key: twitterConfig.consumerKey,
        consumer_secret: twitterConfig.consumerSecret
      }
    };

    request.post(options, function(err, r, body) {
      errorHandler(err, res);
      var jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';

      res.send(JSON.parse(jsonStr));
    });
  });

  router.route("/auth/twitter").post(
    (req, res, next) => {
      const options = {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier=${
          req.query.oauth_verifier
        }`,
        oauth: {
          consumer_key: twitterConfig.consumerKey,
          consumer_secret: twitterConfig.consumerSecret,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      };

      request.post(options, function(err, r, body) {
        if (err) {
          return res.send(500, { message: err.message });
        }

        const bodyString =
          '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body["oauth_token"] = parsedBody.oauth_token;
        req.body["oauth_token_secret"] = parsedBody.oauth_token_secret;
        req.body["user_id"] = parsedBody.user_id;

        next();
      });
    },
    passport.authenticate("twitter-token", { session: false }),
    function(req, res, next) {
      if (!req.user) {
        return res.send(401, "User Not Authenticated");
      }

      // prepare token for API
      req.auth = {
        id: req.user.id
      };

      return next();
    },
    helpers.generateToken,
    helpers.sendToken
  );

  router
    .route("/auth/me")
    .get(helpers.authenticate, helpers.getCurrentUser, helpers.getOne);

  // get timeline tweets for the user
  router
    .route("/tweets")
    .get(helpers.authenticate, helpers.getCurrentUser, helpers.getTweets);

  // post tweet with the user account
  router
    .route("/tweet")
    .post(helpers.authenticate, helpers.getCurrentUser, helpers.postTweet);

  app.use("/api/v1", router);
};