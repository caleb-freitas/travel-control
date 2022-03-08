import { MissingParamError } from "../../presentation/errors";
import { IValidation } from "../../presentation/protocols/validation";
import { ValidationComposite } from "./validation.composite";

interface ISutTypes {
  sut: ValidationComposite;
  validationsStub: IValidation[];
}

function makeValidation(): IValidation {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
}

function makeSut(): ISutTypes {
  const validationsStub = [makeValidation(), makeValidation()];
  const sut = new ValidationComposite(validationsStub);
  return {
    sut,
    validationsStub,
  };
}

describe("ValidationComposite", () => {
  test("should return MissingParamError if any validation fails", () => {
    const { sut, validationsStub } = makeSut();
    jest
      .spyOn(validationsStub[0], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_field" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("should return the first error if more than one validation fails", () => {
    const { sut, validationsStub } = makeSut();
    jest.spyOn(validationsStub[0], "validate").mockReturnValueOnce(new Error());
    jest
      .spyOn(validationsStub[1], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new Error());
  });
});
