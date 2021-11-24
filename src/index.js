const express = require("express");
const app = express();
const tokens = require("./token/tokens.js");
const mongoDB = require("./db/mongoDB");

mongoDB.connect();
app.use(express.json());

app.get("/tokenGenerate", async (req, res) => {
  const token = tokens.createRefreshToken();
  const refreshToken = tokens.createRefreshToken();
  const ip = req.connection.remoteAddress;

  await mongoDB.registerNewToken(token, refreshToken, ip);
  res.status(200).json({ token, refreshToken });
});

app.listen(8080, () => {
  console.log("running");
});
