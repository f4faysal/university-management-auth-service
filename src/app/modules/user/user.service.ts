import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremantal id
  const id = await generateUserId();
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
