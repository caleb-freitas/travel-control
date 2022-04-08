import { InvalidParamError } from "@/presentation/errors";
import { passwordValidationSut } from "@/tests/validation/sut";

describe("PasswordValidation", () => {
  test("should call PasswordValidator with correct password", () => {
    const { sut, passwordValidatorSpy } = passwordValidationSut();
    const isValidSpy = jest.spyOn(passwordValidatorSpy, "isValid");
    sut.validate({ password: "any_password" });
    expect(isValidSpy).toHaveBeenCalledWith("any_password");
  });

  test("should return InvalidParamError if provided password does not meet the requirements", () => {
    const { sut, passwordValidatorSpy } = passwordValidationSut();
    jest.spyOn(passwordValidatorSpy, "isValid").mockReturnValueOnce(false);
    const error = sut.validate({ password: "any_password" });
    expect(error).toEqual(new InvalidParamError("password"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = passwordValidationSut();
    const response = sut.validate({ password: "any_password" });
    expect(response).toBeFalsy();
  });

  test("should throw if EmailValidator throw", () => {
    const { sut, passwordValidatorSpy } = passwordValidationSut();
    jest.spyOn(passwordValidatorSpy, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
