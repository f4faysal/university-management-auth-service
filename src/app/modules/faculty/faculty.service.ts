// import { SortOrder } from 'mongoose';
// import { paginationHelpers } from '../../../helpers/paginationHelper';
// import { IGenericResponse } from '../../../interfaces/common';
// import { IPaginationOptions } from '../../../interfaces/pagination';
// import { facultySearchableFields } from './faculty.constant';
// import { IFaculty, IFacultyFilters } from './faculty.interface';
// import Faculty from './faculty.model';

// const getAllFacultes = async (
//   filters: IFacultyFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<IFaculty[]>> => {
//   const { searchTerm, ...filtersData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       $or: facultySearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await Faculty.find(whereConditions)
//     .populate('academicDepartment')
//     .populate('academicFaculty')
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await Faculty.countDocuments(whereConditions);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// // const getSingleStudent = async (id: string): Promise<IStudent | null> => {
// //      const result = await Student.findOne({ id });
// //      return result;
// // };

// // const updateSudent = async (id: string, payload: Partial<IStudent>) => {
// //      const isExist = await Student.findOne({ id });
// //      if (!isExist) {
// //           throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Fount');
// //      }

// //      const { name, guardian, localGuardian, ...studentData } = payload;

// //      const updateStudentData: Partial<IStudent> = { ...studentData };

// //      if (name && Object.keys(name).length > 0) {
// //           Object.keys(name).forEach(key => {
// //                const nameKry = `name.${key}`;
// //                (updateStudentData as any)[nameKry] = name[key as keyof typeof name];
// //           });
// //      }
// //      if (guardian && Object.keys(guardian).length > 0) {
// //           Object.keys(guardian).forEach(key => {
// //                const guardianKry = `guardian.${key}`;
// //                (updateStudentData as any)[guardianKry] =
// //                     guardian[key as keyof typeof guardian];
// //           });
// //      }
// //      if (localGuardian && Object.keys(localGuardian).length > 0) {
// //           Object.keys(localGuardian).forEach(key => {
// //                const localGuardianKry = `localGuardian.${key}`;
// //                (updateStudentData as any)[localGuardianKry] =
// //                     localGuardian[key as keyof typeof localGuardian];
// //           });
// //      }

// //      const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
// //           new: true,
// //      });

// //      return result;
// // };

// // const deleteStudent = async (id: string): Promise<IStudent | null> => {
// //      const result = await Student.findByIdAndDelete(id);
// //      return result;
// // };
// export const FacultyService = {
//   getAllFacultes,
//   // getSingleStudent,
//   // updateSudent,
//   // deleteStudent,
// };
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const { name, ...FacultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return faculty;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
