import { Authentication } from "@/domain/usecases";

export const mockCompanyAuthenticationParams = (): Authentication.Params => ({
  email: "company@email.com",
  password: "valid_password",
  role: "company",
});

export const mockCompanyAuthenticationResult = (): Authentication.Result => ({
  accessToken: "access_token",
  name: "company_name",
});

export const mockDriverAuthenticationParams = (): Authentication.Params => ({
  email: "driver@email.com",
  password: "valid_password",
  role: "driver",
});

export const mockDriverAuthenticationResult = (): Authentication.Result => ({
  accessToken: "access_token",
  name: "driver_name",
});
