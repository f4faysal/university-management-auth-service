import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import {
  default as sendResponce,
  default as sendResponse,
} from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
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
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponce<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Semester successfully !',
    data: result,
  });
});

const updateSemesters = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updateData);

  sendResponce<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Semester successfully !',
    data: result,
  });
});

const deleteSemesters = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemesters(id);
  sendResponce<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Semester successfully !',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemesters,
  deleteSemesters,
};
