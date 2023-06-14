import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponce from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully !',
      data: result,
    });
    next();
  }
);
const createFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully !',
      data: result,
    });
    next();
  }
);

export const UserController = { createStudent, createFaculty };
