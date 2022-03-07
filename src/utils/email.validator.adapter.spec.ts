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
});
