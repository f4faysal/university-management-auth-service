// import jwt, { Secret } from 'jsonwebtoken';

// const createTocken = (
//   paylod: object,
//   secret: Secret,
//   options: object
// ): string => {
//   return jwt.sign(paylod, secret, options);
// };

// export const jwtHelpers = {
//   createTocken,
// };
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
