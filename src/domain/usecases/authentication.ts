export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
    role: string;
  };
  export type Result = {
    accessToken: string;
  };
}

export interface IAuthentication {
  auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result>;
}
