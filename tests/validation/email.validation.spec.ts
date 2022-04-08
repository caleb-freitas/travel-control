import { InvalidParamError } from "@/presentation/errors";
import { emailValidationSut } from "@/tests/validation/sut";

describe("EmailValidation", () => {
  test("should call EmailValidator with correct email", () => {
    const { sut, emailValidatorSpy } = emailValidationSut();
    const isValidSpy = jest.spyOn(emailValidatorSpy, "isValid");
    sut.validate({ email: "any@email.com" });
    expect(isValidSpy).toHaveBeenCalledWith("any@email.com");
  });

  test("should return InvalidParamError if provided email does not meet the requirements", () => {
    const { sut, emailValidatorSpy } = emailValidationSut();
    jest.spyOn(emailValidatorSpy, "isValid").mockReturnValueOnce(false);
    const error = sut.validate({ email: "any@email.com" });
    expect(error).toEqual(new InvalidParamError("email"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = emailValidationSut();
    const response = sut.validate({ email: "any@email.com" });
    expect(response).toBeFalsy();
  });

  test("should throw if EmailValidator throw", () => {
    const { sut, emailValidatorSpy } = emailValidationSut();
    jest.spyOn(emailValidatorSpy, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
