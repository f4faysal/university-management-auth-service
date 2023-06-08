import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../share/catchAsync';
import sendResponce from '../../../share/sendReponse';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully !',
      data: result,
    });
    next();
  }
);

// const createSemester: RequestHandler = async (req, res, next) => {
//   try {
//     const { ...academicSemesterData } = req.body;
//     const result = await AcademicSemesterService.createSemester(
//       academicSemesterData
//     );
//     // res.status(httpStatus.OK).json({
//     //   success: true,
//     //   message: 'Academic Semester is created successfully !',
//     //   data: result,
//     // });

//     sendResponce(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic Semester is created successfully !',
//       data: result,
//     })
//     next()

//   } catch (error) {
//     next(error);
//   }
// };

export const AcademicSemesterController = {
  createSemester,
};
