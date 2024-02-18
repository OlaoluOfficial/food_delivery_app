const Logger = require('./winston-log');
const errorHandler = async (err, req, res, next) => {
  res.status(err.status??500).json({
    error: {
      name: err.name ?? 'Error',
      message: err.show ? err.message : "Something went wrong in the server"
    }
  })
  Logger.error({status: err.status??500, message: `File: ${err.file}, Line: ${err.line} => ${err.message}`});
}

module.exports = errorHandler;