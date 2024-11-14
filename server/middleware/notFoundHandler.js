const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
};

module.exports = notFoundHandler;
