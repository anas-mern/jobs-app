const joi = require("joi");
const { BadRequest } = require("../errors");
const STATUS = ["interview", "pending", "declined"];

const jobValidate = (req, res, next) => {
  const schema = joi.object({
    company: joi.string().required(),
    position: joi.string().required(),
    status: joi
      .string()
      .valid(...STATUS)
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  next();
};

module.exports = jobValidate