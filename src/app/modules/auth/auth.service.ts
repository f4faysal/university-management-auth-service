import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (paylod: ILoginUser) => {
  const { id, password } = paylod;

  const user = new User();

  // chack user exist

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not fund');
  }
  // Match password

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  // crear JWT
  return {};
};

export const AuthService = {
  loginUser,
};
