import { DbDriverAuthentication } from "@/data/usecases";
import { BcryptAdapter, JwtAdapter } from "@/infra/cryptography";
import {
  LoadDriverByEmailRepository,
  UpdateDriverTokenRepository,
} from "@/infra/repositories";
import env from "@/main/config/env";

export function makeDbDriverAuthentication(): DbDriverAuthentication {
  const salt = 12;
  const loadDriverByEmail = new LoadDriverByEmailRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwt_secret_key);
  const updateAccessToken = new UpdateDriverTokenRepository();
  return new DbDriverAuthentication(
    loadDriverByEmail,
    bcryptAdapter,
    jwtAdapter,
    updateAccessToken
  );
}
