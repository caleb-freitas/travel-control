import { InvalidParamError } from "@/presentation/errors";
import { IEmailValidator } from "@/presentation/protocols";
import { EmailValidation } from "@/validation";

function makeEmailValidator(): IEmailValidator {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
}

interface ISutTypes {
  sut: EmailValidation;
  emailValidatorStub: IEmailValidator;
}

function makeSut(): ISutTypes {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValidation("email", emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
}

describe("EmailValidation", () => {
  test("should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    sut.validate({ email: "any@email.com" });
    expect(isValidSpy).toHaveBeenCalledWith("any@email.com");
  });

  test("should return InvalidParamError if provided email does not meet the requirements", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const error = sut.validate({ email: "any@email.com" });
    expect(error).toEqual(new InvalidParamError("email"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = makeSut();
    const response = sut.validate({ email: "any@email.com" });
    expect(response).toBeFalsy();
  });

  test("should throw if EmailValidator throw", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
