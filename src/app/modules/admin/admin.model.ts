import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './admin.constant';

const adminSchema = new Schema({
  id: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
  },
  gender: { type: String, enum: gender, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String, enum: bloodGroup },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: { type: String },
  managementDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'ManagementDepartment',
  },
  designation: { type: String, required: true },
});

export const Admin = model('Admin', adminSchema);
