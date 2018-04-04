"use strict";

var mongoose = require("mongoose"),
  UserSchema = require("../api/models/user");

module.exports = function() {
  var db = mongoose.connect("mongodb://localhost:27017/telepathy-labs-task");
  UserSchema.set("toJSON", { getters: true, virtuals: true });

  UserSchema.statics.upsertTwitterUser = function(
    token,
    tokenSecret,
    profile,
    cb
  ) {
    var that = this;
    return this.findOne(
      {
        "twitterProvider.id": profile.id
      },
      function(err, user) {
        // create a new user if nothing found
        if (!user) {
          var newUser = new that({
            profile: {
              displayName: profile.displayName,
              username: profile.username,
              profileImage: profile.photos[0].value.replace(
                /normal\b/g,
                "400x400"
              )
            },
            email: profile.emails[0].value,
            twitterProvider: {
              id: profile.id,
              token: token,
              tokenSecret: tokenSecret
            }
          });

          newUser.save(function(error, savedUser) {
            if (error) {
              console.log(error);
            }
            return cb(error, savedUser);
          });
        } else {
          return cb(err, user);
        }
      }
    );
  };

  mongoose.model("User", UserSchema);

  return db;
};