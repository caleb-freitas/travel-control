import { FieldInUseError, InvalidParamError } from "@/presentation/errors";
import { dbAddDriverSut } from "@/tests/data/factory";
import {
  mockDriverParams,
  mockHashedDriverParams,
  mockDriverResult,
} from "@/tests/domain/mocks";

describe("DbAddDriver", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherSpy } = dbAddDriverSut();
    const hashSpy = jest.spyOn(hasherSpy, "hash");
    await sut.add(mockDriverParams());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });

  test("should call AddDriverRepository with correct values", async () => {
    const { sut, addDriverRepositorySpy } = dbAddDriverSut();
    const addSpy = jest.spyOn(addDriverRepositorySpy, "add");
    await sut.add(mockDriverParams());
    expect(addSpy).toHaveBeenCalledWith(mockHashedDriverParams());
  });

  test("should return a driver account on success", async () => {
    const { sut } = dbAddDriverSut();
    const response = await sut.add(mockDriverParams());
    expect(response).toEqual(mockDriverResult());
  });

  test("should call CheckByEmailRepository with correct email", async () => {
    const { sut, checkDriverByEmailRepositorySpy } = dbAddDriverSut();
    const addSpy = jest.spyOn(checkDriverByEmailRepositorySpy, "checkEmail");
    await sut.add(mockDriverResult());
    expect(addSpy).toHaveBeenCalledWith("driver@email.com");
  });

  test("should return a FieldInUseError if CheckByEmailRepository return true", async () => {
    const { sut, checkDriverByEmailRepositorySpy } = dbAddDriverSut();
    jest
      .spyOn(checkDriverByEmailRepositorySpy, "checkEmail")
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const error = await sut.add(mockDriverResult());
    expect(error).toEqual(new FieldInUseError("email"));
  });

  test("should call CheckCompanyIdRepository with correct id", async () => {
    const { sut, checkCompanyByIdRepositorySpy } = dbAddDriverSut();
    const addSpy = jest.spyOn(checkCompanyByIdRepositorySpy, "checkId");
    await sut.add(mockDriverParams());
    expect(addSpy).toHaveBeenCalledWith("company_id");
  });

  test("should return a InvalidParamError if CheckByEmailRepository return false", async () => {
    const { sut, checkCompanyByIdRepositorySpy } = dbAddDriverSut();
    jest
      .spyOn(checkCompanyByIdRepositorySpy, "checkId")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const error = await sut.add(mockDriverResult());
    expect(error).toEqual(new InvalidParamError("company_id"));
  });
});
