import { FieldInUseError } from "@/presentation/errors";
import { dbAddCompanySut } from "@/tests/data/sut";
import {
  mockCompanyParams,
  mockCompanyResult,
  mockHashedCompanyParams,
} from "@/tests/domain/mocks";

describe("DbAddCompany", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherSpy } = dbAddCompanySut();
    const hashSpy = jest.spyOn(hasherSpy, "hash");
    await sut.add(mockCompanyParams());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });

  test("should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositorySpy } = dbAddCompanySut();
    const addSpy = jest.spyOn(addAccountRepositorySpy, "add");
    await sut.add(mockCompanyParams());
    expect(addSpy).toHaveBeenCalledWith(mockHashedCompanyParams());
  });

  test("should call CheckCompanyByEmailRepository with correct email", async () => {
    const { sut, checkCompanyByEmailRepositorySpy } = dbAddCompanySut();
    const checkEmailSpy = jest.spyOn(
      checkCompanyByEmailRepositorySpy,
      "checkEmail"
    );
    await sut.add(mockCompanyParams());
    expect(checkEmailSpy).toHaveBeenCalledWith("company@email.com");
  });

  test("should throw an error if CheckCompanyByEmailRepository return true", async () => {
    const { sut, checkCompanyByEmailRepositorySpy } = dbAddCompanySut();
    jest
      .spyOn(checkCompanyByEmailRepositorySpy, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const error = await sut.add(mockCompanyParams());
    expect(error).toEqual(new FieldInUseError("email"));
  });

  test("should throw an error if CheckCompanyByCnpjRepository return true", async () => {
    const { sut, checkCompanyByCnpjRepositorySpy } = dbAddCompanySut();
    jest
      .spyOn(checkCompanyByCnpjRepositorySpy, "checkCnpj")
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const error = await sut.add(mockCompanyParams());
    expect(error).toEqual(new FieldInUseError("cnpj"));
  });

  test("should call CheckCompanyByCnpjRepository with correct cnpj", async () => {
    const { sut, checkCompanyByCnpjRepositorySpy } = dbAddCompanySut();
    const checkCnpjSpy = jest.spyOn(
      checkCompanyByCnpjRepositorySpy,
      "checkCnpj"
    );
    await sut.add(mockCompanyParams());
    expect(checkCnpjSpy).toHaveBeenCalledWith("company_cnpj");
  });

  test("should return an account on success", async () => {
    const { sut } = dbAddCompanySut();
    const account = await sut.add(mockCompanyParams());
    expect(account).toEqual(mockCompanyResult());
  });
});
