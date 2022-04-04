import { Authentication } from "@/domain/usecases";
import { randEmail, randPassword, randRole } from "@ngneat/falso";

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: randEmail(),
  password: randPassword({ size: 16 }),
  role: randRole(),
});
