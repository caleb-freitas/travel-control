import { ILoadAccountByToken } from "@/domain/usecases";
import { AuthenticationMiddleware } from "@/presentation/middleware";
import { DbLoadAccountByTokenSpy } from "@/tests/presentation/mocks";

type Sut = {
  sut: AuthenticationMiddleware;
  dbLoadAccountByTokenSpy: ILoadAccountByToken;
};

export function authorizationSut(): Sut {
  const dbLoadAccountByTokenSpy = new DbLoadAccountByTokenSpy();
  const sut = new AuthenticationMiddleware(dbLoadAccountByTokenSpy);
  return {
    sut,
    dbLoadAccountByTokenSpy,
  };
}
