// import { Model, Types } from 'mongoose';
// import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
// import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

// export type IFaculty = {
//   id: string;
//   name: {
//     firstName: string;
//     middleName?: string;
//     lastName: string;
//   };
//   gender: 'male' | 'female';
//   dateOfBirth: string;
//   email: string;
//   contactNo: string;
//   emergencyContactNo: string;
//   presentAddress: string;
//   permanentAddress: string;
//   bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
//   designation: 'Professor' | 'Lecturer';
//   academicDepartment: Types.ObjectId | IAcademicDepartment;
//   academicFaculty: Types.ObjectId | IAcademicFaculty;
// };

// export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

// export type IFacultyFilters = {
//   searchTerm?: string;
//   id?: string;
//   bloodGroup?: string;
//   email?: string;
//   contactNo?: string;
//   designation?: string;
// };

import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IFaculty = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'male' | 'female';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  designation: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  academicDepartment?: string;
  academicFaculty?: string;
  designation?: string;
};
