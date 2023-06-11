import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const academicSemester: IAcademicSemester = {
    title: 'Autumn',
    year: '2025',
    code: '01',
    startMonth: 'May',
    endMonth: 'September',
  };

  // auto generated incremantal id
  const id = await generateStudentId(academicSemester);
  user.id = id;
  // default password
  if (!user.Password) {
    user.Password = config.default_user_password as string;
  }
  const createdUsers = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, 'Failed to create User');
  }
  return createdUsers;
};

export const UserService = {
  createUser,
};
