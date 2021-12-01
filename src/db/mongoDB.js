const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = {
  uri: process.env.DB_URI,
  ModelToken: mongoose.model("token", {
    normalToken: Object,
    refreshToken: Object,
    ip: String,
  }),

  connect() {
    return new Promise((resolve) => {
      mongoose.connect(this.uri, (err) => {
        if (!err) return resolve();
        else throw err;
      });
    });
  },

  registerNewToken(normalToken, refreshToken, ip) {
    toDB = this.ModelToken({
      normalToken: normalToken,
      refreshToken: refreshToken,
      ip: ip,
    });
    return new Promise((resolve, reject) => {
      toDB.save((err) => {
        if (!err) return resolve();
        reject([500, { error: "can't register a new token in the database" }]);
      });
    });
  },

  getToken(token) {
    return new Promise((resolve, reject) => {
      this.ModelToken.findOne({ "normalToken.token": token }, (err, obj) => {
        if (!err) return resolve(obj);
        reject([500, { error: "can't get a token from the database" }]);
      });
    });
  },

  replaceToken(token, newToken) {
    return new Promise((resolve, reject) => {
      this.ModelToken.findOneAndUpdate(
        { "normalToken.token": token },
        newToken,
        (err, obj) => {
          if (!err) return resolve(obj);
          else reject([500, { error: "can't replace the token" }]);
        }
      );
    });
  },
};

module.exports = mongoDB;
