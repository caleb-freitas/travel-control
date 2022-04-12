import { DbLoadAccountByToken } from "@/data/usecases";
import { ILoadAccountByToken } from "@/domain/usecases";
import { JwtAdapter } from "@/infra/cryptography";
import { LoadAccountByTokenRepository } from "@/infra/repositories";
import env from "@/main/config/env";

export function makeDbLoadAccountByToken(): ILoadAccountByToken {
  const loadDriverByEmail = new LoadAccountByTokenRepository();
  const jwtAdapter = new JwtAdapter(env.jwt_secret_key);
  return new DbLoadAccountByToken(jwtAdapter, loadDriverByEmail);
}
