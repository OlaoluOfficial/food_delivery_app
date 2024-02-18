class ApiError extends Error {
  constructor(message, line, file, options = {}) {
    super(message)
    this.line = line;
    this.file = file;

    this.name = options.name ?? this.name;
    this.success = false;
    this.status = options?.status;
    this.show = this.name === 'SequelizeDatabaseError' ? false : options.show ?? true;
  
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
