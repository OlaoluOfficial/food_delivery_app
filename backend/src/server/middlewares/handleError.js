module.exports.dbSchemaErrors = (err) => {
  let errors = { name: "", email: "" };

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ restaurant }) => {
      errors[restaurant.path] = restaurant.message;
    });
  } else {
    const key = Object.keys(err.keyPattern);
    if (key[0] === "phone") {
      return "Phone Number already exist";
    } else if (key[0] === "email") {
      return "Email address already exist";
    } else if (key[0] === "username") {
      return "Username already exist";
    }
  }
  return errors;
};

module.exports.JoiErrorHandler = (error) => {
  // let errors = "";
  const errors = {
    firstName: "",
    lastName: "",
    Phone: "",
    altPhoneNumber: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    userType: "",
  };
  var errorType = error.details[0].type;
  var errorLabel = error.details[0].context.label;

  switch (errorType) {
    case "string.empty":
      errors[errorLabel] = error.message;
      break;
    case "string.pattern.base":
      errors[errorLabel] = error.message;
      break;
    case "any.required":
      errors[errorLabel] = error.message;
      break;
    case "string.email":
      errors[errorLabel] += error.message;
      break;
    case "any.only":
      errors[errorLabel] = error.message;
      break;
    default:
      errors[errorLabel] = error.message;
      break;
  }
  return errors;
};

module.exports.RestaurantSchemaErrors = (err) => {
  let errors = {};

  if (
    err._message.includes(
      "Restaurant validation failed" || "Product validation failed"
    )
  ) {
    Object.values(err.errors).forEach(({ restaurant }) => {
      errors[restaurant.path] = restaurant.message;
    });
  }

  return errors;
};
