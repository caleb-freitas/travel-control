import { InvalidParamError } from "@/presentation/errors";
import { comparePasswordsSut } from "@/tests/validation/sut";

describe("CompareFieldsValidation", () => {
  test("should return an InvalidParamError if validation fails", () => {
    const { sut } = comparePasswordsSut();
    const error = sut.validate({
      field: "any_value",
      fieldToCompare: "different_value",
    });
    expect(error).toEqual(new InvalidParamError("fieldToCompare"));
  });

  test("should not return if validation succeeds", () => {
    const { sut } = comparePasswordsSut();
    const error = sut.validate({
      field: "any_value",
      fieldToCompare: "any_value",
    });
    expect(error).toBeFalsy();
  });
});
