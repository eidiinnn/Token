const { uuid } = require("uuidv4");

const newTokens = {
  createNormalToken() {
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 60);
    return {
      token: uuid(),
      expirationDate: expiration,
    };
  },
  createRefreshToken() {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 10);
    return {
      token: uuid(),
      expirationDate: expiration,
    };
  },
};

module.exports = newTokens;
