import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponce } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handelZosError = (error: ZodError): IGenericErrorResponce => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Valodation Error',
    errorMessages: errors,
  };
};

export default handelZosError;
