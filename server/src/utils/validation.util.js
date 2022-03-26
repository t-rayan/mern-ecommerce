import Joi from "joi";
// user register validation
export const userRegisterValidation = Joi.object({
  firstname: Joi.string().alphanum().min(2).max(20).required(),
  lastname: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

// user register validation
export const userLoginValidation = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

// create a category validation
export const createCategoryValidation = Joi.object({
  name: Joi.string().min(2).required(),
});

// create a product validation
export const createProductValidation = Joi.object({
  name: Joi.string().min(2).required(),
  inventory: Joi.number().required(),
  price: Joi.number().required(),
  size: Joi.string(),
  color: Joi.string(),
  desc: Joi.string(),
  img: Joi.string(),
  category: Joi.string(),
});
