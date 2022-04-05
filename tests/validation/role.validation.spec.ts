import { InvalidParamError } from "@/presentation/errors";
import { RoleValidation } from "@/validation";

const makeSut = (): RoleValidation => {
  const roleOptions = ["company", "driver"];
  return new RoleValidation("role", roleOptions);
};

describe("RequiredFieldValidation", () => {
  test("should return an InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ role: "invalid" });
    expect(error).toEqual(new InvalidParamError("role"));
  });

  test("should not return if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ role: "company" });
    expect(error).toBeFalsy();
  });
});
