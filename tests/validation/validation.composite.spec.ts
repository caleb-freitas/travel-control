import { MissingParamError } from "@/presentation/errors";
import { validationCompositeSut } from "@/tests/validation/sut";

describe("ValidationComposite", () => {
  test("should return MissingParamError if any validation fails", () => {
    const { sut, validationsStub } = validationCompositeSut();
    jest
      .spyOn(validationsStub[0], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_field" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("should return the first error if more than one validation fails", () => {
    const { sut, validationsStub } = validationCompositeSut();
    jest.spyOn(validationsStub[0], "validate").mockReturnValueOnce(new Error());
    jest
      .spyOn(validationsStub[1], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new Error());
  });

  test("should not return if validation succeeds", () => {
    const { sut } = validationCompositeSut();
    const error = sut.validate({ field: "any_value" });
    expect(error).toBeFalsy();
  });
});
