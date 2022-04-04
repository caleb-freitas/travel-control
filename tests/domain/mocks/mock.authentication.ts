import { Authentication } from "@/domain/usecases";
import { randEmail, randPassword } from "@ngneat/falso";

export const mockCompanyAuthenticationParams = (): Authentication.Params => ({
  email: randEmail(),
  password: "password",
  role: "company",
});

export const mockCompanyAuthenticationResult = (): Authentication.Result => ({
  accessToken: "access_token",
  name: "name",
});

export const mockDriverAuthenticationParams = (): Authentication.Params => ({
  email: randEmail(),
  password: randPassword({ size: 16 }),
  role: "driver",
});

export const mockDriverAuthenticationResult = (): Authentication.Result => ({
  accessToken: "access_token",
  name: "name",
});
