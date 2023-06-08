import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IGenericResponce } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { PaginationHelpres } from '../../helpers/paginationsHelpers';
import { academicSemesterTitelCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitelCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invlide Semister Code !');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponce<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpres.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
