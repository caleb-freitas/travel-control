import { IPasswordValidator } from "../presentation/protocols";

describe("PasswordValidatorAdapter", () => {
  test("should return true if password-validator returns true", () => {
    class PasswordValidatorAdapter implements IPasswordValidator {
      isValid(password: string): boolean {
        return true;
      }
    }
    const sut = new PasswordValidatorAdapter();
    const response = sut.isValid("valid_password");
    expect(response).toBe(true);
  });
});
