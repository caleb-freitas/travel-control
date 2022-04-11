import { ILoadAccountByToken } from "@/domain/usecases";
import { AuthenticationMiddleware } from "@/presentation/middleware";
import { IHttpRequest } from "@/presentation/protocols";
import { DbLoadAccountByTokenSpy } from "@/tests/presentation/mocks";

type Sut = {
  sut: AuthenticationMiddleware;
  dbLoadAccountByTokenSpy: ILoadAccountByToken;
};

export function authenticationSut(): Sut {
  const dbLoadAccountByTokenSpy = new DbLoadAccountByTokenSpy();
  const sut = new AuthenticationMiddleware(dbLoadAccountByTokenSpy);
  return {
    sut,
    dbLoadAccountByTokenSpy,
  };
}
