import { MissingParamError } from "@/presentation/errors";
import { requiredFieldsSut } from "@/tests/validation/sut";

describe("RequiredFieldValidation", () => {
  test("should return a MissingParamError if validation fails", () => {
    const { sut } = requiredFieldsSut();
    const error = sut.validate({ name: "any_name" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = requiredFieldsSut();
    const error = sut.validate({ field: "any_name" });
    expect(error).toBeFalsy();
  });
});
