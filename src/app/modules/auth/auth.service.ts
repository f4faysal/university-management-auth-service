import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpars } from '../../../helpers/jwtHalpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponce } from './auth.interface';

const loginUser = async (paylod: ILoginUser): Promise<ILoginUserResponce> => {
  const { id, password } = paylod;

  // const user = new User(); instance mathod

  // chack user exist
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not fund');
  }
  // Match password

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  // crear JWT

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpars.createTocken(
    {
      id: userId,
      role: role,
    },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  const refreshToken = jwtHelpars.createTocken(
    {
      id: userId,
      role: role,
    },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in }
  );

  console.log(accessToken, refreshToken, needsPasswordChange);

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
