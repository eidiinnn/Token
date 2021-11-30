const verifyTokens = require("./verifyTokens");

const process = {
  async start(normalToken, refreshToken, mongoDB) {
    try {
      const dbContent = await mongoDB.getToken(normalToken.token);

      verifyTokens.verifyClientTokens(normalToken, refreshToken);
      verifyTokens.compareTokens(normalToken, dbContent, "normalToken");

      const resultNormal = verifyTokens.compareTokensDate(dbContent, "normalToken");

      if (resultNormal === "ok") {
        return "access granted";
      } else {
        verifyTokens.compareTokens(refreshToken, dbContent, "refreshToken");
        const resultRefresh = verifyTokens.compareTokensDate(dbContent, "normalToken");

        if (resultRefresh === "ok") return "make new token";
        else return "make new refresh token";
      }
    } catch (err) {
      throw err;
    }
  },
};

module.exports = process;
