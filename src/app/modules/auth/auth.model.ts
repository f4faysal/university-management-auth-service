// import { Schema, model } from 'mongoose';
// import { bloodGroup, gender } from './student.constant';
// import { IStudent, StudentModel } from './student.interface';

// export const studentSchema = new Schema<IStudent>(
//   {
//     id: {
//       type: String,
//       require: true,
//       unique: true,
//     },
//     name: {
//       type: {
//         firstName: {
//           type: String,
//           require: true,
//         },
//         middleName: {
//           type: String,
//         },
//         lastName: {
//           type: String,
//           require: true,
//         },
//       },
//     },
//     dateOfBirth: {
//       type: String,
//     },
//     gender: {
//       type: String,
//       enum: gender,
//       require: true,
//     },
//     bloodGroup: {
//       type: String,
//       enum: bloodGroup,
//     },
//     email: {
//       type: String,
//       require: true,
//       unique: true,
//     },
//     contactNo: {
//       type: String,
//       unique: true,
//       require: true,
//     },
//     emergencyContactNo: {
//       type: String,
//       require: true,
//     },
//     presentAddress: {
//       type: String,
//       require: true,
//     },
//     permanentAddress: {
//       type: String,
//       require: true,
//     },
//     guardian: {
//       require: true,
//       type: {
//         fatherName: {
//           type: String,
//           require: true,
//         },
//         fatherOccupation: {
//           type: String,
//           require: true,
//         },
//         fatherContactNo: {
//           type: String,
//           require: true,
//         },
//         motherName: {
//           type: String,
//           require: true,
//         },
//         motherOccupation: {
//           type: String,
//           require: true,
//         },
//         motherContactNo: {
//           type: String,
//           require: true,
//         },
//         address: {
//           type: String,
//           require: true,
//         },
//       },
//     },
//     localGuardian: {
//       require: true,
//       type: {
//         name: {
//           type: String,
//           require: true,
//         },
//         occupation: {
//           type: String,
//           require: true,
//         },
//         contactNo: {
//           type: String,
//           require: true,
//         },
//         address: {
//           type: String,
//           require: true,
//         },
//       },
//     },
//     profileImage: {
//       type: String,
//       readonly: true,
//     },
//     academicSemester: {
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicSemester',
//       require: true,
//     },
//     academicDepartment: {
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicDepartment',
//       require: true,
//     },
//     academicFaculty: {
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicFaculty',
//       require: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// // 3. Create a Model.
// export const Student = model<IStudent, StudentModel>('Student', studentSchema);
