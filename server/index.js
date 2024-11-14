require("dotenv").config();
require("./config/database")();
const express = require("express");
const logger = require("./utils/logger");
const cors = require("cors");
const requestLogger = require("./middleware/requestLogger");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(requestLogger);

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
