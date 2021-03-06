const joi = require("@hapi/joi");

const contactValidation = data => {
  const schema = {
    name: joi
      .string()
      .min(6)
      .trim()
      .required(),
    email: joi
      .string()
      .trim()
      .min(6)
      .required()
      .email(),
    phone: joi
      .string()
      .trim()
      .regex(/^(\+[0-9]{3}|0)[0-9]{10}$/)
  };

  return joi.validate(data, schema);
};

module.exports.contactValidation = contactValidation;
