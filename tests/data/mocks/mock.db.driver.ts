import {
  ILoadDriverByEmailRepository,
  IUpdateDriverTokenRepository,
  LoadDriverByEmailRepository,
} from "@/data/protocols/database";
import { Authentication, IAuthentication } from "@/domain/usecases";
import {
  mockDriverAuthenticationResult,
  mockDriverResult,
} from "@/tests/domain/mocks";

export class DbDriverAuthenticationSpy implements IAuthentication {
  result = mockDriverAuthenticationResult();

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    return this.result;
  }
}

export class LoadDriverByEmailRepositorySpy
  // eslint-disable-next-line prettier/prettier
  implements ILoadDriverByEmailRepository {
  result = mockDriverResult();
  async loadByEmail(
    email: string
  ): Promise<LoadDriverByEmailRepository.Result> {
    return this.result;
  }
}

export class UpdateDriverTokenRepositorySpy
  // eslint-disable-next-line prettier/prettier
  implements IUpdateDriverTokenRepository {
  async updateAccessToken(id: string, token: string): Promise<void> {
    return null;
  }
}
