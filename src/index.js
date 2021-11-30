const express = require("express");
const app = express();
const mongoDB = require("./db/mongoDB");
const process = require("./token/process/process");
const createTokens = require("./token/CreateTokens/createTokens");
const error = require("./error/error");

mongoDB.connect();
app.use(express.json());

app.get("/tokenGenerate", async (req, res) => {
  try {
    const result = await createTokens.start(mongoDB);
    res.status(200).json(result);
  } catch (err) {
    error.start(err, res, "can't generate the token");
  }
});

app.get("/verify", async (req, res) => {
  try {
    const { normalToken, refreshToken } = req.body;
    const processResult = await process.start(normalToken, refreshToken, mongoDB);
    res.status(200).json({ processResult });
  } catch (err) {
    error.start(err, res, "can't verify the token");
  }
});

app.listen(8080, () => {
  console.log("running");
});
