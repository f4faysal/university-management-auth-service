import { IGenericErrorMessage } from './error';

export type IGenericErrorResponce = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponce<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
