import validator from "validator";

import { EmailValidatorAdapter } from "./email.validator.adapter";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidatorAdapter", () => {
  test("should call validator with the correct email", () => {
    const sut = new EmailValidatorAdapter();
    const isValidSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("valid@email.com");
    expect(isValidSpy).toHaveBeenCalledWith("valid@email.com");
  });

  test("should return true if validator return true", () => {
    const sut = new EmailValidatorAdapter();
    const response = sut.isValid("valid@email.com");
    expect(response).toBe(true);
  });

  test("should return true if validator return true", () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const response = sut.isValid("valid@email.com");
    expect(response).toBe(false);
  });
});
