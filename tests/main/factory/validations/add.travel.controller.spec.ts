import { makeAddTravelValidation } from "@/main/factory/validations";
import { IValidation } from "@/presentation/protocols";
import { RequiredFieldValidation, ValidationComposite } from "@/validation";

jest.mock("../../../../src/validation/validation.composite.ts");

describe("AddTruckValidationFactory", () => {
  test("should call ValidationComposite with correct validations", () => {
    makeAddTravelValidation();
    const validations: IValidation[] = [];
    const requiredFields = [
      "driver_id",
      "company_id",
      "truck_id",
      "client",
      "departure_city",
      "departure_state",
      "destination_city",
      "destination_state",
      "product",
      "freight_value",
    ];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
