import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requirdRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authoragition tocken
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorigest');
      }
      // verifiedToken - synchronous
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      req.user = verifiedUser;

      // role thiye gud korar jnno
      if (requirdRole.length && !requirdRole.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
