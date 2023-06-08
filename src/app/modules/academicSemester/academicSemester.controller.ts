import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginatios';
import catchAsync from '../../../share/catchAsync';
import pick from '../../../share/pick';
import sendResponce from '../../../share/sendReponse';
import { IAcademicSemester } from './academicSemester.interface';
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

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions);

    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    );
    sendResponce<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Retircved successfully !',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
