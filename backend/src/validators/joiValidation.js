const Joi = require("joi");

const signUp = (data) => {
  Schemas = Joi.object({
    firstName: Joi.string().required().trim().messages({
      "string.base": `First name should be a "text"`,
      "string.empty": `Firstname cannot be empty`,
      "any.required": `Firstname field is required`,
    }),
    lastName: Joi.string().required().trim().messages({
      "string.base": `Lastname should be a "text"`,
      "string.empty": `Lastname cannot be empty`,
      "any.required": `Lastname field is required`,
    }),
    Phone: Joi.string()
      .trim()
      .required()
      .pattern(new RegExp(/^((\+234)+|0)[7-9]{1}[0-9]{9}$/))
      .messages({
        "string.pattern.base": `Invalid phone number`,
        "any.required": "phone Number must not be empty",
      }),
    altPhoneNumber: Joi.string()
      .trim()
      .pattern(new RegExp(/^((\+234)+|0)[7-9]{1}[0-9]{9}$/))
      .messages({
        "string.pattern.base": `Invalid phone number`,
      }),

    Email: Joi.string().trim().email().required().messages({
      "string.email": `Invalid email, for instance 'example@gmail.com'`,
      "any.required": `this field is require`,
      "string.empty": `"email" cannot be empty field`,
    }),
    Password: Joi.string()
      .required()
      .min(8)
      .pattern(
        new RegExp(/(?=.*[A-Z])[a-zA-Z0-9]+[\#\@\$\%\&\*\(\)\>\<\~\{\}]+/)
      )
      .messages({
        "string.pattern.base": `Password must contain atleast one capital letter and one special characters`,
        "any.required": `Password field is required`,
        "string.min": `Password must be minimum 8 characters`,
      }),

    confirmPassword: Joi.any().valid(Joi.ref("Password")).required().messages({
      "any.require": "Confirm Password is required",
      "any.only": "Passwords do not match",
    }),

    userType: Joi.string().required().trim().messages({
      "string.base": `Select your type of user`,
      "string.empty": `You must select type of user`,
      "any.required": `user type is required`,
    }),
  });
  return Schemas.validate(data);
};

const loginSchema = (data) => {
  Schemas = Joi.object({
    Email: Joi.string().email().required().trim().messages({
      "string.email": `Invalid email, for instance 'example@gmail.com'`,
      "any.required": `Email is required`,
      "string.empty": `Email cannot be empty field`,
    }),
    Password: Joi.string().trim().required().messages({
      "any.required": `Password field is required`,
      "string.min": `Password length must at least be 8 characters long`,
    }),
  });
  return Schemas.validate(data);
};

const hostelSchema = (data) => {
  Schemas = Joi.object({
    Description: Joi.string().required().trim().messages({
      "string.base": `Description should be a text`,
      "string.empty": `Description cannot be empty`,
      "any.required": `Description field is required`,
    }),
    Price: Joi.number().required().positive().messages({
      "any.required": `Price is required`,
      "number.base": `Invalid price, Price must be in numbers`,
      "number.positive": `Invalid price`,
    }),
    Campus: Joi.string().required().trim().messages({
      "string.base": `Campus should be a text`,
      "string.empty": `Campus cannot be empty`,
      "any.required": `Campus is required`,
    }),
    Location: Joi.string().required().trim().messages({
      "string.base": `Location should be a text`,
      "string.empty": `Location cannot be empty`,
      "any.required": `Location is required`,
    }),
  });

  return Schemas.validate(data);
};

const itemSchema = (data) => {
  const schema = Joi.object({
    category: Joi.string().required().trim().messages({
      "string.base": `category should be a "text"`,
      "string.empty": `category cannot be empty`,
      "any.required": `category field is required`,
    }),
    itemName: Joi.string().required().trim().messages({
      "string.base": `itemName should be a "text"`,
      "string.empty": `itemName cannot be empty`,
      "any.required": `itemName field is required`,
    }),
    description: Joi.string().required().trim().messages({
      "string.base": `description should be a "text"`,
      "string.empty": `description cannot be empty`,
      "any.required": `description is required`,
    }),
    price: Joi.number().required().trim().positive().messages({
      "number.empty": `price cannot be empty`,
      "number.positive": `Invalid price`,
      "any.required": `price is required`,
    }),
    quantity: Joi.number().trim().positive().messages({
      "number.empty": `No of items cannot be empty`,
      "number.positive": `Invalid number`,
      "any.required": `No of item is required`,
    }),
    negotiable: Joi.string().trim(),
    campus: Joi.string().required().trim().messages({
      "string.base": `campus should be a "text"`,
      "string.empty": `campus cannot be empty`,
      "any.required": `campus  is required`,
    }),
    location: Joi.string().required().trim().messages({
      "string.base": `Address should be a "text"`,
      "string.empty": `Address cannot be empty`,
      "any.required": `Address is required`,
    }),
  });
  return schema.validate(data);
};

const updateItemSchema = (data) => {
  const schema = Joi.object({
    category: Joi.string().trim().messages({
      "string.base": `category should be a "text"`,
      "string.empty": `category cannot be empty`,
    }),
    itemName: Joi.string().trim().messages({
      "string.base": `itemName should be a "text"`,
      "string.empty": `itemName cannot be empty`,
    }),
    description: Joi.string().trim().messages({
      "string.base": `description should be a "text"`,
      "string.empty": `description cannot be empty`,
    }),
    price: Joi.string().trim().messages({
      "string.empty": `price cannot be empty`,
    }),
    quantity: Joi.string().trim(),
    campus: Joi.string().trim().messages({
      "string.base": `campus should be a "text"`,
      "string.empty": `campus cannot be empty`,
    }),
    location: Joi.string().trim().messages({
      "string.base": `location should be a "text"`,
      "string.empty": `location cannot be empty`,
    }),
  });
  return schema.validate(data);
};

const newPasswordSchema = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string()
      .required()
      .min(8)
      .pattern(
        new RegExp(/(?=.*[A-Z])[a-zA-Z0-9]+[\#\@\$\%\&\*\(\)\>\<\~\{\}]+/)
      )
      .messages({
        "string.pattern.base": `Password must contain atleast one capital letter and one special characters`,
        "any.required": `Password field is required`,
        "string.min": `Password length must at least be 8 characters long`,
      }),

    newPassword: Joi.string()
      .required()
      .min(8)
      .pattern(
        new RegExp(/(?=.*[A-Z])[a-zA-Z0-9]+[\#\@\$\%\&\*\(\)\>\<\~\{\}]+/)
      )
      .messages({
        "string.pattern.base": `Password must contain atleast one capital letter and one special characters`,
        "any.required": `Password field is required`,
        "string.min": `Password length must at least be 8 characters long`,
      }),

    confirmPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.require": "Confirm Password is required",
        "any.only": "Passwords do not match",
      }),
  });
  return schema.validate(data);
};

module.exports.signUp = signUp;
module.exports.loginSchema = loginSchema;
module.exports.itemSchema = itemSchema;
module.exports.hostelSchema = hostelSchema;
module.exports.updateItemSchema = updateItemSchema;
module.exports.newPasswordSchema = newPasswordSchema;
