import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  //   incremant by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const findLastFacultyId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return findLastFacultyId?.id;
};
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  //   incremant by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const findLastAdminId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return findLastAdminId?.id;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  //   incremant by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
