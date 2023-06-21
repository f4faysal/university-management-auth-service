// import { Schema, model } from 'mongoose';
// import { bloodGroup, gender } from './admin.constant';

// const adminSchema = new Schema({
//   id: { type: String, required: true },
//   name: {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     middleName: { type: String, required: true },
//   },
//   gender: { type: String, enum: gender, required: true },
//   dateOfBirth: { type: String, required: true },
//   email: { type: String, required: true },
//   contactNo: { type: String, required: true },
//   emergencyContactNo: { type: String, required: true },
//   bloodGroup: { type: String, enum: bloodGroup },
//   presentAddress: { type: String, required: true },
//   permanentAddress: { type: String, required: true },
//   profileImage: { type: String },
//   managementDepartment: {
//     type: Schema.Types.ObjectId,
//     ref: 'ManagementDepartment',
//   },
//   designation: { type: String, required: true },
// });

// export const Admin = model('Admin', adminSchema);

import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
