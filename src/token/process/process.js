const verifyTokens = require("./verifyTokens");

const process = {
  async start(normalToken, refreshToken, mongoDB) {
    try {
      const dbContent = await mongoDB.getToken(normalToken.token);
      this.firstVerify(normalToken, refreshToken, dbContent);

      const normalTokenDate = verifyTokens.compareTokensDate(dbContent, "normalToken");
      if (normalTokenDate === "expires") return this.refreshTokenAction(dbContent);
      else return { msg: "access granted" };
    } catch (err) {
      throw err;
    }
  },

  refreshTokenAction(dbContent) {
    const result = verifyTokens.compareTokensDate(dbContent, "refreshToken");
    if (result === "ok") return { msg: "make new normal token" };
    else return { msg: "make new refresh token" };
  },

  firstVerify(normalToken, refreshToken, dbContent) {
    verifyTokens.verifyClientTokens(normalToken, refreshToken);
    verifyTokens.compareTokens(normalToken, dbContent, "normalToken");
  },
};

module.exports = process;
