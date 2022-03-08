import { IPasswordValidator } from "../../presentation/protocols";
import { PasswordValidation } from "./password.validation";

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
});
