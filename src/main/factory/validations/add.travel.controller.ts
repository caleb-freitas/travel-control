import { IValidation } from "@/presentation/protocols";
import { RequiredFieldValidation, ValidationComposite } from "@/validation";

export function makeAddTravelValidation(): ValidationComposite {
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
  return new ValidationComposite(validations);
}
