import { ILoadCompanyByEmailRepository } from "@/data/protocols";
import { DbCompanyAuthentication } from "@/data/usecases";
import { LoadCompanyByEmailRepositorySpy } from "@/tests/data/mocks";
import { mockCompanyAuthenticationParams } from "@/tests/domain/mocks";

type Sut = {
  sut: DbCompanyAuthentication;
  loadCompanyByEmailRepositorySpy: ILoadCompanyByEmailRepository;
};

function makeSut(): Sut {
  const loadCompanyByEmailRepositorySpy = new LoadCompanyByEmailRepositorySpy();
  const sut = new DbCompanyAuthentication(loadCompanyByEmailRepositorySpy);
  return {
    sut,
    loadCompanyByEmailRepositorySpy,
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
});
