const logger = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
  if (err.name === "SyntaxError") {
    return res.status(400).send("Invalid JSON");
  }

  logger.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });  
};

module.exports = errorHandler;
