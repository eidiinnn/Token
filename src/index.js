const express = require("express");
const app = express();
const tokens = require("./token/tokens.js");
const mongoDB = require("./db/mongoDB");
const verifyTokens = require("./token/verifyTokens");

mongoDB.connect();
app.use(express.json());

app.get("/tokenGenerate", async (req, res) => {
  try {
    const normalToken = tokens.createRefreshToken();
    const refreshToken = tokens.createRefreshToken();
    const ip = req.connection.remoteAddress;
    await mongoDB.registerNewToken(normalToken, refreshToken, ip);
    res.status(200).json({ normalToken, refreshToken });
  } catch (err) {
    if (!Array.isArray(err))
      res.status(500).json({ error: "can't generate the token" });
    res.status(err[0]).json(err[1]);
  }
});

app.get("/verify", async (req, res) => {
  try {
    const { normalToken, refreshToken } = req.body;
    await verifyTokens.verify(normalToken, refreshToken);
    const dbContent = await mongoDB.getToken(normalToken.token);
    res.status(200).json({ dbContent });
  } catch (err) {
    if (!Array.isArray(err))
      res.status(500).json({ error: "can't verify the token" });
    res.status(err[0]).json(err[1]);
  }
});

app.listen(8080, () => {
  console.log("running");
});
