import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../share/catchAsync';
import { default as sendResponce } from '../../../share/sendReponse';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully !',
    data: result,
  });
});

export const AcademicFacultyController = { createFaculty };
