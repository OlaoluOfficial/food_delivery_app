module.exports.dbSchemaErrors = (err) => {
  let errors = {};

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((item ) => {
      const errorMessage = item.message.replace(/Path `/g, "");
      errors[item.path] = errorMessage;
    
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

module.exports.itemSchemaErrors = (err) => {
  let errors = {};

  if (
    err._message.includes("item validation failed" || "Product validation failed")
  ) {
    Object.values(err.errors).forEach(({ item }) => {
      errors[item.path] = item.message;
    });
  }

  return errors;
};
