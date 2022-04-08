import { InvalidParamError } from "@/presentation/errors";
import { cnpjValidationSut } from "@/tests/validation/sut";

describe("CnpjValidation", () => {
  test("should call CnpjValidator with correct cnpj", () => {
    const { sut, cnpjValidatorSpy } = cnpjValidationSut();
    const isValidSpy = jest.spyOn(cnpjValidatorSpy, "isCnpj");
    sut.validate({ cnpj: "any_cnpj" });
    expect(isValidSpy).toHaveBeenCalledWith("any_cnpj");
  });

  test("should return InvalidParamError if provided cnpj does not meet the requirements", () => {
    const { sut, cnpjValidatorSpy } = cnpjValidationSut();
    jest.spyOn(cnpjValidatorSpy, "isCnpj").mockReturnValueOnce(false);
    const error = sut.validate({ cnpj: "invalid_cnpj" });
    expect(error).toEqual(new InvalidParamError("cnpj"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = cnpjValidationSut();
    const response = sut.validate({ cnpj: "any_cnpj" });
    expect(response).toBeFalsy();
  });

  test("should throw if CnpjValidator throw", () => {
    const { sut, cnpjValidatorSpy } = cnpjValidationSut();
    jest.spyOn(cnpjValidatorSpy, "isCnpj").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
