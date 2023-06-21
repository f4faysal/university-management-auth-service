// import httpStatus from 'http-status';
// import mongoose from 'mongoose';
// import config from '../../../config';
// import ApiError from '../../../errors/ApiError';
// import { AcademicSemester } from '../academicSemester/academicSemester.model';
// import { IFaculty } from '../faculty/faculty.interface';
// import Faculty from '../faculty/faculty.model';
// import { IStudent } from '../student/student.interface';
// import { Student } from '../student/student.model';
// import { IUser } from './user.interface';
// import { User } from './user.model';
// import { generateFacultyId, generateStudentId } from './user.utils';

// const createStudent = async (
//   student: IStudent,
//   user: IUser
// ): Promise<IUser | null> => {
//   // default password
//   if (!user.Password) {
//     user.Password = config.default_student_password as string;
//   }

//   // sett role
//   user.role = 'student';

//   // academicsemester using to yaer and code like 2023 , 03 --> id 230300001
//   const academicsemester = await AcademicSemester.findById(
//     student.academicSemester
//   );

//   let newUserAllData = null;

//   // startTransaction
//   const sesstion = await mongoose.startSession();

//   try {
//     sesstion.startTransaction();
//     // auto generated incremantal id
//     const id = await generateStudentId(academicsemester);
//     user.id = id;
//     student.id = id;

//     /**
//      *
//      * Argument of type '(Document<unknown, {}, IAcademicSemester> & Omit<IAcademicSemester & { _id: ObjectId; }, never>) | null' is not assignable to parameter of type 'IAcademicSemester'.
//       Type 'null' is not assignable to type 'IAcademicSemester'.
//      */

//     const newStudent = await Student.create([student], { sesstion });
//     if (!newStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
//     }

//     // set student --> _id inti id user.student

//     user.student = newStudent[0]._id;

//     const newUsers = await User.create([user], { sesstion });
//     if (!newUsers.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }

//     newUserAllData = newUsers[0];

//     await sesstion.commitTransaction();
//     await sesstion.endSession();
//   } catch (error) {
//     await sesstion.abortTransaction();
//     await sesstion.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicSemester',
//         },
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   }

//   return newUserAllData;
// };

// const createFaculty = async (
//   faculty: IFaculty,
//   user: IUser
// ): Promise<IFaculty | IUser | null> => {
//   // default password

//   if (!user.Password) {
//     user.Password = config.default_student_password as string;
//   }

//   // sett role
//   user.role = 'faculty';

//   let newUserAllData = null;

//   // startTransaction
//   const sesstion = await mongoose.startSession();

//   try {
//     sesstion.startTransaction();
//     // auto generated incremantal id
//     const id = await generateFacultyId();
//     user.id = id;
//     faculty.id = id;
//     /**
//      *
//      * Argument of type '(Document<unknown, {}, IAcademicSemester> & Omit<IAcademicSemester & { _id: ObjectId; }, never>) | null' is not assignable to parameter of type 'IAcademicSemester'.
//       Type 'null' is not assignable to type 'IAcademicSemester'.
//      */
//     const newFaculty = await Faculty.create([faculty], { sesstion });
//     if (!newFaculty.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
//     }
//     // set student --> _id inti id user.student
//     user.faculty = newFaculty[0]._id;

//     const newUsers = await User.create([user], { sesstion });
//     if (!newUsers.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }

//     newUserAllData = newUsers[0];

//     await sesstion.commitTransaction();
//     await sesstion.endSession();
//   } catch (error) {
//     await sesstion.abortTransaction();
//     await sesstion.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   }

//   return newUserAllData;
// };

// export const UserService = {
//   createStudent,
//   createFaculty,
// };

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateStudentId(academicsemester as IAcademicSemester);

    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
