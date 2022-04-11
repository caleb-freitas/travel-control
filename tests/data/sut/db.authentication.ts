import { DbAuthentication } from "@/data/usecases";
import {
  DbCompanyAuthenticationSpy,
  DbDriverAuthenticationSpy,
} from "@/tests/data/mocks";

type Sut = {
  sut: DbAuthentication;
  dbCompanyAuthenticationSpy: DbCompanyAuthenticationSpy;
  dbDriverAuthenticationSpy: DbDriverAuthenticationSpy;
};

export function authenticationSut(): Sut {
  const dbCompanyAuthenticationSpy = new DbCompanyAuthenticationSpy();
  const dbDriverAuthenticationSpy = new DbDriverAuthenticationSpy();
  const sut = new DbAuthentication(
    dbCompanyAuthenticationSpy,
    dbDriverAuthenticationSpy
  );
  return {
    sut,
    dbCompanyAuthenticationSpy,
    dbDriverAuthenticationSpy,
  };
}
