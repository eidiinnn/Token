const verifyTokens = {
  verifyClientTokens(normalToken, refreshToken, dbContent) {
    if (!normalToken.token || !refreshToken.token || !dbContent) {
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
      return false;
    } else {
      return true;
    }
  },
};

module.exports = verifyTokens;
