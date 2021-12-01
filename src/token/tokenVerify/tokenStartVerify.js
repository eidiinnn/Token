const verifyTokens = require("./verifyTokens");
const remakeNewToken = require("./remakeNewToken");

const process = {
  async start(normalToken, refreshToken, mongoDB) {
    const dbContent = await mongoDB.getToken(normalToken.token);
    this.firstVerify(normalToken, refreshToken, dbContent);
    return this.verifyExpiresToken(dbContent, mongoDB, refreshToken);
  },

  firstVerify(normalToken, refreshToken, dbContent) {
    verifyTokens.verifyClientTokens(normalToken, refreshToken, dbContent);
    verifyTokens.compareTokens(normalToken, dbContent, "normalToken");
  },

  dateVerify(dbContent) {
    const normalTokenDate = verifyTokens.compareTokensDate(dbContent, "normalToken");
    const refreshTokenDate = verifyTokens.compareTokensDate(dbContent, "refreshToken");
    return { normalTokenDate, refreshTokenDate };
  },

  verifyExpiresToken(dbContent, mongoDB, refreshToken) {
    const { normalTokenDate, refreshTokenDate } = this.dateVerify(dbContent);
    verifyTokens.compareTokens(refreshToken, dbContent, "refreshToken");

    if (!normalTokenDate && !refreshTokenDate)
      return remakeNewToken.start(dbContent, mongoDB, "refreshToken");
    if (!normalTokenDate) return remakeNewToken.start(dbContent, mongoDB, "normalToken");
    else return { msg: "access granted" };
  },
};

module.exports = process;
