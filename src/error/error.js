const error = {
  start(err, res, message500) {
    if (!Array.isArray(err)) {
      res.status(500).json({ error: message500 });
      console.log(err);
    } else {
      res.status(err[0]).json(err[1]);
    }
  },
};

module.exports = error;
