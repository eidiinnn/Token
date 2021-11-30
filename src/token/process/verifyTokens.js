const verifyTokens = {
  verifyClientTokens(normalToken, refreshToken) {
    if (!normalToken.token || !refreshToken.token) {
      throw [400, { error: "problem with tokens" }];
    } else {
      return;
    }
  },

  compareTokens(token, dbContent, normalOrRefresh) {
    if (token.token !== dbContent[normalOrRefresh]["token"]) {
      throw [400, { error: "token don't exist" }];
    } else {
      return;
    }
  },

  compareTokensDate(dbContent, normalOrRefresh) {
    let nowDate = new Date();
    let dateDB = new Date(dbContent[normalOrRefresh]["expirationDate"]);

    if (nowDate.getTime() > dateDB.getTime()) {
      return "expires";
    } else {
      return "ok";
    }
  },
};

module.exports = verifyTokens;
