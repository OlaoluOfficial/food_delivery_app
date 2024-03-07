module.exports.dbSchemaErrors = (err) => {
  let errorMessage="";
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((item ) => {
      errorMessage = item.message.replace(/Path `/g, "");
     
    });
  } else {
    const key = Object.keys(err.keyPattern);
    if (key[0] === "phone") {
      return "Phone Number already exist";
    } else if (key[0] === "email") {
      return "Email address already exist";
    } 
  }
  return errorMessage;
  
};

module.exports.JoiErrorHandler = (error) => {
  // let errors = "";
 let errorMessage="";
  var errorType = error.details[0].type;
  // var errorLabel = error.details[0].context.label;

  switch (errorType) {
    case "string.empty":
      errorMessage = error.message;
      break;
    case "string.pattern.base":
      errorMessage = error.message;
      break;
    case "any.required":
      errorMessage = error.message;
      break;
    case "string.email":
      errorMessage += error.message;
      break;
    case "any.only":
      errorMessage = error.message;
      break;
    default:
      errorMessage += error.message;
      break;
  }
  return errorMessage;
};

module.exports.productsSchemaErrors = (err) => {
  // let errors = {};
 let errorMessage=""
  if (err.message.includes("Product validation failed")) {
    Object.values(err.errors).forEach((item ) => {
      errorMessage = item.message.replace(/Path `/g, "");
      
    });
  } 
  return errorMessage;

};
