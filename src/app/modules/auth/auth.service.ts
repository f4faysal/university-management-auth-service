import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHalpers';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// const loginUser = async (paylod: ILoginUser): Promise<ILoginUserResponse> => {
//   const { id, password } = paylod;

//   // const user = new User(); instance mathod

//   // chack user exist
//   const isUserExist = await User.isUserExist(id);

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User dose not fund');
//   }
//   // Match password

//   if (await User.isPasswordMatched(password, isUserExist.password)) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
//   }

//   // crear JWT

//   const { id: userId, role, needsPasswordChange } = isUserExist;

//   const accessToken = jwtHelpers.createTocken(
//     {
//       id: userId,
//       role: role,
//     },
//     config.jwt.secret as Secret,
//     { expiresIn: config.jwt.expires_in }
//   );

//   const refreshToken = jwtHelpers.createTocken(
//     {
//       id: userId,
//       role: role,
//     },
//     config.jwt.refresh_secret as Secret,
//     { expiresIn: config.jwt.refresh_expires_in }
//   );

//   // console.log(accessToken, refreshToken, needsPasswordChange);

//   return {
//     accessToken,
//     refreshToken,
//     needsPasswordChange,
//   };
// };

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
// const refreshToken = async (token: string) => {

//   // varify token - synchronous
//   let validationToken = null
//   try {
//     validationToken = jwt.verify(token, config.jwt.refresh_secret as Secret);

//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, "invalid refresh token")
//   }

//   const { id } = validationToken

//   // chaking the user refresh token

//   const isUserExist = await User.isUserExist(id)

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, "user dose not exite")
//   }

//   // genaret new token

//   const newAccessToken = jwtHelpers.createTocken(
//     { id: isUserExist.id, role: isUserExist.role },
//     config.jwt.secret as Secret,
//     { expiresIn: config.jwt.expires_in })

//   return newAccessToken

// };

export const AuthService = {
  loginUser,
  refreshToken,
};
