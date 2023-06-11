import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully !',
      data: result,
    });
    next();
  }
);

export const UserController = { createUser };
