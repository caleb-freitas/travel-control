import { InvalidParamError } from "@/presentation/errors";
import { IPasswordValidator } from "@/presentation/protocols";
import { PasswordValidation } from "@/validation";

function makePasswordValidator(): IPasswordValidator {
  class PasswordValidatorStub implements IPasswordValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new PasswordValidatorStub();
}

interface ISutTypes {
  sut: PasswordValidation;
  passwordValidatorStub: IPasswordValidator;
}

function makeSut(): ISutTypes {
  const passwordValidatorStub = makePasswordValidator();
  const sut = new PasswordValidation("password", passwordValidatorStub);
  return {
    sut,
    passwordValidatorStub,
  };
}

describe("PasswordValidation", () => {
  test("should call PasswordValidator with correct password", () => {
    const { sut, passwordValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(passwordValidatorStub, "isValid");
    sut.validate({ password: "any_password" });
    expect(isValidSpy).toHaveBeenCalledWith("any_password");
  });

  test("should return InvalidParamError if provided password does not meet the requirements", () => {
    const { sut, passwordValidatorStub } = makeSut();
    jest.spyOn(passwordValidatorStub, "isValid").mockReturnValueOnce(false);
    const error = sut.validate({ password: "any_password" });
    expect(error).toEqual(new InvalidParamError("password"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = makeSut();
    const response = sut.validate({ password: "any_password" });
    expect(response).toBeFalsy();
  });

  test("should throw if EmailValidator throw", () => {
    const { sut, passwordValidatorStub } = makeSut();
    jest.spyOn(passwordValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
