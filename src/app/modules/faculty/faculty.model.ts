import mongoose, { Schema } from 'mongoose';
import { bloodGroup, designation } from './faculty.constant';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: { type: String },
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
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
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  designation: {
    type: String,
    enum: designation,
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
});

const Faculty = mongoose.model<IFaculty, FacultyModel>(
  'Faculty',
  facultySchema
);

export default Faculty;
