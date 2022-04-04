import { IHashComparer, ILoadCompanyByEmailRepository } from "@/data/protocols";
import { DbCompanyAuthentication } from "@/data/usecases";
import {
  HashComparerSpy,
  LoadCompanyByEmailRepositorySpy,
} from "@/tests/data/mocks";
import {
  mockCompanyAuthenticationParams,
  throwError,
} from "@/tests/domain/mocks";

type Sut = {
  sut: DbCompanyAuthentication;
  loadCompanyByEmailRepositorySpy: ILoadCompanyByEmailRepository;
  hashComparerSpy: IHashComparer;
};

function makeSut(): Sut {
  const loadCompanyByEmailRepositorySpy = new LoadCompanyByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const sut = new DbCompanyAuthentication(
    loadCompanyByEmailRepositorySpy,
    hashComparerSpy
  );
  return {
    sut,
    loadCompanyByEmailRepositorySpy,
    hashComparerSpy,
  };
}

describe("DbCompanyAuthentication", () => {
  test("should call LoadCompanyByEmailRepository with correct email", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail");
    const authenticationParams = mockCompanyAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadSpy).toHaveBeenCalledWith(authenticationParams.email);
  });

  test("should throw if LoadCompanyByEmailRepository throw", async () => {
    const { sut, loadCompanyByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadCompanyByEmailRepositorySpy, "loadByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockCompanyAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });
});
