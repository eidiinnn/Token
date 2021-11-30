const express = require("express");
const app = express();
const mongoDB = require("./db/mongoDB");
const process = require("./token/process/process");
const createTokens = require("./token/CreateTokens/createTokens");

mongoDB.connect();
app.use(express.json());

app.get("/tokenGenerate", async (req, res) => {
  try {
    const result = await createTokens.start(mongoDB);
    res.status(200).json(result);
  } catch (err) {
    if (!Array.isArray(err)) {
      res.status(500).json({ error: "can't generate the token" });
      console.log(err);
    } else {
      res.status(err[0]).json(err[1]);
    }
  }
});

app.get("/verify", async (req, res) => {
  try {
    const { normalToken, refreshToken } = req.body;
    const processResult = await process.start(normalToken, refreshToken, mongoDB);
    res.status(200).json({ processResult });
  } catch (err) {
    if (!Array.isArray(err)) {
      res.status(500).json({ error: "can't verify the token" });
      console.log(err);
    } else {
      res.status(err[0]).json(err[1]);
    }
  }
});

app.listen(8080, () => {
  console.log("running");
});
