/**
 * Task 3 & Task 5 - Global Error Handling Middleware
 * Catch errors and return structured JSON response without exposing raw stack traces.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error encountered:', err.message);

  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Handle Mongoose Validation Error (Task 5 requirement)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});
  }

  // Handle Duplicate Key Error (e.g., unique email)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for ${field} field.`;
  }

  // Handle CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(errors && { details: errors }),
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
