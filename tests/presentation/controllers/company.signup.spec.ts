import {
  FieldInUseError,
  MissingParamError,
  ServerError,
} from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers";
import { mockCompanyResult } from "@/tests/domain/mocks";
import { companySignupSut } from "@/tests/presentation/controllers/sut";
import { mockCompanyRequest } from "@/tests/presentation/mocks";

describe("CompanySignUpController", () => {
  test("should call AddAccount with correct values", async () => {
    const { sut, addCompanySpy } = companySignupSut();
    const addSpy = jest.spyOn(addCompanySpy, "add");
    await sut.handle(mockCompanyRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: "company",
      email: "company@email.com",
      password: "valid_password",
      cnpj: "company_cnpj",
    });
  });

  test("should return 500 if AddAccount throw", async () => {
    const { sut, addCompanySpy } = companySignupSut();
    jest.spyOn(addCompanySpy, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, rejects) => rejects(new Error()));
    });
    const httpResponse = await sut.handle(mockCompanyRequest());
    expect(httpResponse).toEqual(serverError(new ServerError("email")));
  });

  test("should return 403 if AddAccount return a FieldInUseError", async () => {
    const { sut, addCompanySpy } = companySignupSut();
    jest
      .spyOn(addCompanySpy, "add")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(new FieldInUseError("field")))
      );
    const response = await sut.handle(mockCompanyRequest());
    expect(response).toEqual(forbidden(new FieldInUseError("field")));
  });

  test("should call Validation with correct values", async () => {
    const { sut, validationSpy } = companySignupSut();
    const validateSpy = jest.spyOn(validationSpy, "validate");
    await sut.handle(mockCompanyRequest());
    expect(validateSpy).toHaveBeenCalledWith(mockCompanyRequest().body);
  });

  test("should return 500 if Validation throw", async () => {
    const { sut, validationSpy } = companySignupSut();
    jest.spyOn(validationSpy, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(mockCompanyRequest());
    expect(httpResponse).toEqual(serverError(new ServerError("email")));
  });

  test("should return 400 if Validation returns an error", async () => {
    const { sut, validationSpy } = companySignupSut();
    jest
      .spyOn(validationSpy, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));
    const response = await sut.handle(mockCompanyRequest());
    expect(response).toEqual(badRequest(new MissingParamError("any_field")));
  });

  test("should return 200 in success", async () => {
    const { sut } = companySignupSut();
    const response = await sut.handle(mockCompanyRequest());
    expect(response).toEqual(ok(mockCompanyResult()));
  });
});
