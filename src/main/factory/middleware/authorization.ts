import { makeDbLoadAccountByToken } from "@/main/factory";
import { AuthorizationMiddleware } from "@/presentation/middleware";
import { IMiddleware } from "@/presentation/protocols";

export function makeAuthorizationMiddleware(): IMiddleware {
  return new AuthorizationMiddleware(makeDbLoadAccountByToken(), "company");
}
