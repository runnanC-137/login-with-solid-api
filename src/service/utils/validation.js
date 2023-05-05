const Joi = require('@hapi/joi')

function validation (reqBody, password = true) {
  return password
    ? Joi.object({
      password: Joi.string().required().min(6).max(400),
      email: Joi.string().required().min(3).max(50),
      name: Joi.string().required().min(3).max(100)
    }).validate(reqBody)
    : Joi.object({
      email: Joi.string().required().min(3).max(50),
      name: Joi.string().required().min(3).max(100)
    }).validate(reqBody)
}

module.exports = {
  validation
}
