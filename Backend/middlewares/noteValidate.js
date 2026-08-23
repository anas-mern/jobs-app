const joi = require("joi");
const { BadRequest } = require("../errors");

const noteValidate = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().min(5).max(30).required(),
    body: joi.string().min(10).max(300).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  next();
};

module.exports = noteValidate