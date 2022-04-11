import { ILoadAccountByToken } from "@/domain/usecases";
import { AuthorizationMiddleware } from "@/presentation/middleware";
import { DbLoadAccountByTokenSpy } from "@/tests/presentation/mocks";

type Sut = {
  sut: AuthorizationMiddleware;
  dbLoadAccountByTokenSpy: ILoadAccountByToken;
};

export function authorizationSut(): Sut {
  const dbLoadAccountByTokenSpy = new DbLoadAccountByTokenSpy();
  const sut = new AuthorizationMiddleware(dbLoadAccountByTokenSpy, "company");
  return {
    sut,
    dbLoadAccountByTokenSpy,
  };
}
