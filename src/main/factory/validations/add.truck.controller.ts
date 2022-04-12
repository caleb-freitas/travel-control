import { IValidation } from "@/presentation/protocols";
import { RequiredFieldValidation, ValidationComposite } from "@/validation";

export function makeAddTruckValidation(): ValidationComposite {
  const validations: IValidation[] = [];
  const requiredFields = ["license_plate", "ton_capacity", "brand", "model"];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
}
