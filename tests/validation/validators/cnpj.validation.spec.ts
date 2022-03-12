import { InvalidParamError } from "../../../src/presentation/errors";
import { ICnpjValidator } from "../../../src/presentation/protocols";
import { CnpjValidation } from "../../../src/validation/validators";

function makeCnpjValidator(): ICnpjValidator {
  class CnpjValidatorStub implements ICnpjValidator {
    isCnpj(cnpj: string): boolean {
      return true;
    }
  }
  return new CnpjValidatorStub();
}

interface ISutTypes {
  sut: CnpjValidation;
  cnpjValidatorStub: ICnpjValidator;
}

function makeSut(): ISutTypes {
  const cnpjValidatorStub = makeCnpjValidator();
  const sut = new CnpjValidation("cnpj", cnpjValidatorStub);
  return {
    sut,
    cnpjValidatorStub,
  };
}

describe("CnpjValidation", () => {
  test("should call CnpjValidator with correct cnpj", () => {
    const { sut, cnpjValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(cnpjValidatorStub, "isCnpj");
    sut.validate({ cnpj: "any_cnpj" });
    expect(isValidSpy).toHaveBeenCalledWith("any_cnpj");
  });

  test("should return InvalidParamError if provided cnpj does not meet the requirements", () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, "isCnpj").mockReturnValueOnce(false);
    const error = sut.validate({ cnpj: "invalid_cnpj" });
    expect(error).toEqual(new InvalidParamError("cnpj"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = makeSut();
    const response = sut.validate({ cnpj: "any_cnpj" });
    expect(response).toBeFalsy();
  });

  test("should throw if CnpjValidator throw", () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, "isCnpj").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
