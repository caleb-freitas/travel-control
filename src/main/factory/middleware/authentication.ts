import { makeDbLoadAccountByToken } from "@/main/factory";
import { AuthenticationMiddleware } from "@/presentation/middleware";
import { IMiddleware } from "@/presentation/protocols";

export function makeAuthMiddleware(role?: string): IMiddleware {
  return new AuthenticationMiddleware(makeDbLoadAccountByToken(), role);
}
