const newTokens = require("../CreateTokens/generateToken");

const remakeNewToken = {
  async start(dbContent, mongoDB, normalOrRefresh) {
    if (normalOrRefresh === "normalToken") {
      return this.normalTokenReplace(dbContent, mongoDB);
    }
    if (normalOrRefresh === "refreshToken") {
      return this.normalRefreshTokenReplace(dbContent, mongoDB);
    }
  },

  generateNewTokens() {
    const newNormalToken = newTokens.createNormalToken();
    const newRefreshToken = newTokens.createRefreshToken();
    return { newNormalToken, newRefreshToken };
  },

  async normalTokenReplace(dbContent, mongoDB) {
    const { newNormalToken } = this.generateNewTokens();
    const newDocument = {
      normalToken: newNormalToken,
      refreshToken: dbContent.refreshToken,
    };
    await mongoDB.replaceToken(dbContent.normalToken.token, newDocument);
    return {
      normalToken: { token: newNormalToken.token },
      refreshToken: { token: dbContent.refreshToken.token },
    };
  },

  async normalRefreshTokenReplace(dbContent, mongoDB) {
    const { newNormalToken, newRefreshToken } = this.generateNewTokens();
    const newDocument = {
      normalToken: newNormalToken,
      refreshToken: newRefreshToken,
    };
    await mongoDB.replaceToken(dbContent.normalToken.token, newDocument);
    return {
      normalToken: { token: newNormalToken.token },
      refreshToken: { token: newRefreshToken.token },
    };
  },
};

module.exports = remakeNewToken;
