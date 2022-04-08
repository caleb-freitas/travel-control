import { emailValidatorSut } from "@/tests/infra/validators/sut";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidatorAdapter", () => {
  test("should call validator with the correct email", () => {
    const { sut } = emailValidatorSut();
    const isValidSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("valid@email.com");
    expect(isValidSpy).toHaveBeenCalledWith("valid@email.com");
  });

  test("should return true if validator return true", () => {
    const { sut } = emailValidatorSut();
    const response = sut.isValid("valid@email.com");
    expect(response).toBe(true);
  });

  test("should return false if validator return false", () => {
    const { sut } = emailValidatorSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const response = sut.isValid("valid@email.com");
    expect(response).toBe(false);
  });
});
