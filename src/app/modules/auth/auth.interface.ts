export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponce = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
