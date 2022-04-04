import { Authentication } from "@/domain/usecases";
import {
  randEmail,
  randPassword,
  randRole,
  randUserName,
  randWord,
} from "@ngneat/falso";

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: randEmail(),
  password: randPassword({ size: 16 }),
  role: "company",
});

export const mockAuthenticationResult = (): Authentication.Result => ({
  accessToken: "access_token",
  name: "name",
});
