/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable  no-unused-vars */
/*typescript-eslint no-unused-vars*/
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handelValidationError from '../../errors/handelValidationError';
import handelZosError from '../../errors/handelZosError';
import handleCastError from '../../errors/handleCastError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorlogger } from '../../shared/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const golobalErrorHandlar: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('🛑 ☢️ ☣️ golobalErrorHandlar~', error)
    : errorlogger.error('🛑 ☢️ ☣️ golobalErrorHandlar ~', error);

  let statusCode = 500;
  let message = '☢️ Somthing Wen Wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    // ValidationError
    const simplifiedError = handelValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.name === 'CastError') {
    // CastError
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    //ZodError
    const simplifiedError = handelZosError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof ApiError) {
    //ApiError
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
    //Error
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
