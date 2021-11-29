const mongoose = require("mongoose");

const mongoDB = {
  uri: "mongodb://172.17.0.1:27017/tokens",
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
        reject([500, {'error': "can't register a new token in the database"}]);
      });
    });
  },

  getToken(token) {
    return new Promise((resolve, reject) => {
      this.ModelToken.findOne(
        { normalOrRefresh: Object, token: token },
        (err, obj) => {
          if (!err) return resolve(obj);
          reject([500, {'error': "can't get a token from the database"}]);
        }
      );
    });
  },
};

module.exports = mongoDB;
