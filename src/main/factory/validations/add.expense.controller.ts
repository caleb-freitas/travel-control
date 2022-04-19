import { IValidation } from "@/presentation/protocols";
import { RequiredFieldValidation, ValidationComposite } from "@/validation";

export function makeAddExpenseValidation(): ValidationComposite {
  const validations: IValidation[] = [];
  const requiredFields = [
    "travel_id",
    "label",
    "description",
    "value",
    "payment_method",
  ];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
}
