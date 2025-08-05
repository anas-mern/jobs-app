const { NotFound } = require("../errors");

const notFound = (req, res, next) => {
  next(new NotFound(`Can't find ${req.originalUrl} on this server!`));
};

module.exports = notFound;
