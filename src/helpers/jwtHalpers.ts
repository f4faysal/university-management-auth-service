import jwt, { Secret } from 'jsonwebtoken';

const createTocken = (
  paylod: object,
  secret: Secret,
  options: object
): string => {
  return jwt.sign(paylod, secret, options);
};

export const jwtHelpars = {
  createTocken,
};
