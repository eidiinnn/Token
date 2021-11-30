const newTokens = require("./generateToken");

const createTokens = {
  async start(mongoDB) {
    const normalToken = newTokens.createNormalToken();
    const refreshToken = newTokens.createRefreshToken();

    await mongoDB.registerNewToken(normalToken, refreshToken);
    return {
      normalToken: { token: normalToken.token },
      refreshToken: { token: refreshToken.token },
    };
  },
};

module.exports = createTokens;
