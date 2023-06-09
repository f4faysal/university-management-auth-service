/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handelValidationError from '../../errors/handelValidationError';
import handelZosError from '../../errors/handelZosError';
import handleCastError from '../../errors/handleCastError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorlogger } from '../../share/logger';

const golobalErrorHandlar: ErrorRequestHandler = (error, req, res) => {
  config.env === 'development'
    ? console.log('🛑 ☢️ ☣️ golobalErrorHandlar~', error)
    : errorlogger.error('🛑 ☢️ ☣️ golobalErrorHandlar ~', error);

  let statusCode = 500;
  let message = '☢️ Somthing Wen Wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handelValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handelZosError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default golobalErrorHandlar;
