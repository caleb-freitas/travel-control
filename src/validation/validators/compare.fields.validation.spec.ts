import { InvalidParamError } from "../../presentation/errors";
import { CompareFieldsValidation } from "./compare.fields.validation";

function makeSut(): CompareFieldsValidation {
  const sut = new CompareFieldsValidation("field", "fieldToCompare");
  return sut;
}
describe("CompareFieldsValidation", () => {
  test("should return an InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_value",
      fieldToCompare: "different_value",
    });
    expect(error).toEqual(new InvalidParamError("fieldToCompare"));
  });
});
