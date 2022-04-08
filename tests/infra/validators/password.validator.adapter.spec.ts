import {} from "password-validator";
import { passwordValidatorSut } from "@/tests/infra/validators/sut";

describe("PasswordValidatorAdapter", () => {
  test("should return true if password have at least 8 characters", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("ValidPassword123");
    expect(response).toBe(true);
  });

  test("should return false if password has less than 8 characters", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("invalid12");
    expect(response).toBe(false);
  });

  test("should return true if password have uppercase letters", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("ValidPassword123");
    expect(response).toBe(true);
  });

  test("should return false if password does not have uppercase letters", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("invalid_password123");
    expect(response).toBe(false);
  });

  test("should return true if password have lowercase letters", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("ValidPassword123");
    expect(response).toBe(true);
  });

  test("should return false if password does not have lowercase letters", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("INVALID_PASSWORD123");
    expect(response).toBe(false);
  });

  test("should return true if password have digits", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("InvalidPassword123");
    expect(response).toBe(true);
  });

  test("should return true if password does not have digits", () => {
    const { sut } = passwordValidatorSut();
    const response = sut.isValid("InvalidPassword");
    expect(response).toBe(false);
  });
});
