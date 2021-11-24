const mongoose = require("mongoose");

const mongoDB = {
  uri: "mongodb://172.17.0.1:27017/tokens",
  ModelToken: mongoose.model("token", {
    token: Object,
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

  registerNewToken(token, refreshToken, ip) {
    toDB = this.ModelToken({
      token: token,
      refreshToken: refreshToken,
      ip: ip,
    });
    return new Promise((resolve) => {
      toDB.save((err) => {
        if (!err) return resolve();
        else throw err;
      });
    });
  },
};

module.exports = mongoDB;
