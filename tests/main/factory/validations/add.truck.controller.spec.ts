import { makeAddTruckValidation } from "@/main/factory/validations";
import { IValidation } from "@/presentation/protocols";
import { RequiredFieldValidation, ValidationComposite } from "@/validation";

jest.mock("../../../../src/validation/validation.composite.ts");

describe("AddTruckValidationFactory", () => {
  test("should call ValidationComposite with correct validations", () => {
    makeAddTruckValidation();
    const validations: IValidation[] = [];
    const requiredFields = ["license_plate", "ton_capacity", "brand", "model"];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
