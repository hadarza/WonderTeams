const Joi = require('joi')
const RegisterValidation = (data) => {
    const schema = Joi.object({
      Name: Joi.string().required().min(3),
      Password: Joi.string().required().min(6),
      Unit: Joi.string().required().min(3),
      isAdmin: Joi.boolean().default(false)
    });
    return schema.validate(data);
  };


  const LoginValidation = (data) => {
    const schema = Joi.object({
      Name: Joi.string().required().min(3),
      Password: Joi.string().required().min(6),
    });
    return schema.validate(data);
  };
module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;