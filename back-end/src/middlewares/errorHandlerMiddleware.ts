/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import AppError from '../utils/AppError';

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).send({
    status: 500,
    message: 'Internal server error',
  });
};

export default errorHandlerMiddleware;
