const verifyTokens = {
  verify(normalToken, refreshToken) {
    return new Promise((resolve, reject) => {
      if (!normalToken.token || !refreshToken.token) {
        reject([400, { error: "problem with tokens" }]);
      } else {
        resolve();
      }
    });
  },
};

module.exports = verifyTokens;
