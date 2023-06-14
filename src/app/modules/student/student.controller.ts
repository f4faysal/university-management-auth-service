import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import {
  default as sendResponce,
  default as sendResponse,
} from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.getSingleStudent(id);

  sendResponce<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Student successfully !',
    data: result,
  });
});

const updateSudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await StudentService.updateSudent(id, updateData);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Student successfully !',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponce<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Student successfully !',
    data: result,
  });
});

export const StudentsController = {
  getAllStudents,
  getSingleStudent,
  updateSudent,
  deleteStudent,
};
