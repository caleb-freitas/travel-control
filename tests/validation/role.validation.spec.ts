import { InvalidParamError } from "@/presentation/errors";
import { roleValidationSut } from "@/tests/validation/sut";

describe("RequiredFieldValidation", () => {
  test("should return an InvalidParamError if validation fails", () => {
    const { sut } = roleValidationSut();
    const error = sut.validate({ role: "invalid" });
    expect(error).toEqual(new InvalidParamError("role"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = roleValidationSut();
    const error = sut.validate({ role: "company" });
    expect(error).toBeFalsy();
  });
});
