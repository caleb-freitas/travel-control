import { DbCompanyAuthentication } from "@/data/usecases";
import {
  LoadCompanyByEmailRepository,
  UpdateCompanyTokenRepository,
} from "@/infra";
import { BcryptAdapter, JwtAdapter } from "@/infra/cryptography";
import env from "@/main/config/env";

export function makeDbCompanyAuthentication(): DbCompanyAuthentication {
  const salt = 12;
  const loadCompanyByEmail = new LoadCompanyByEmailRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwt_secret_key);
  const updateAccessToken = new UpdateCompanyTokenRepository();
  return new DbCompanyAuthentication(
    loadCompanyByEmail,
    bcryptAdapter,
    jwtAdapter,
    updateAccessToken
  );
}
