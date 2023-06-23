import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponce } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  // set refresh Token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponce>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully !',
    data: others,
  });
});

// const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await StudentService.getSingleStudent(id);

//   sendResponce<IStudent>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Get Single Student successfully !',
//     data: result,
//   });
// });

// const updateSudent = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updateData = req.body;

//   const result = await StudentService.updateSudent(id, updateData);

//   sendResponce(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Update Student successfully !',
//     data: result,
//   });
// });

// const deleteStudent = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await StudentService.deleteStudent(id);
//   sendResponce<IStudent>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Delete Student successfully !',
//     data: result,
//   });
// });

export const AuthController = {
  loginUser,
};
