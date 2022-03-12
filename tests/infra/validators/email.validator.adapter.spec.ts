import validator from "validator";

import { EmailValidatorAdapter } from "../../../src/infra/validators/email.validator.adapter";
import { IEmailValidator } from "../../../src/presentation/protocols";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

interface ISutTypes {
  sut: IEmailValidator;
}

function makeSut(): ISutTypes {
  const sut = new EmailValidatorAdapter();
  return { sut };
}

describe("EmailValidatorAdapter", () => {
  test("should call validator with the correct email", () => {
    const { sut } = makeSut();
    const isValidSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("valid@email.com");
    expect(isValidSpy).toHaveBeenCalledWith("valid@email.com");
  });

  test("should return true if validator return true", () => {
    const { sut } = makeSut();
    const response = sut.isValid("valid@email.com");
    expect(response).toBe(true);
  });

  test("should return false if validator return false", () => {
    const { sut } = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const response = sut.isValid("valid@email.com");
    expect(response).toBe(false);
  });
});
