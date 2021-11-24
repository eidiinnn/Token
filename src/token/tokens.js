const { uuid } = require("uuidv4");

const tokens = {
  createToken() {
    return {
      token: uuid(),
      CreateDate: new Date(),
      expirationDate: new Date(Date.now() + 300000),
    };
  },
  createRefreshToken() {
    return {
      token: uuid(),
      CreateDate: new Date(),
      expirationDate: new Date(Date.now() + 600000),
    };
  },
};

module.exports = tokens;
