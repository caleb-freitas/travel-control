import { IValidation } from "@/presentation/protocols";

export class ValidationSpy implements IValidation {
  validate(input: any): Error {
    return null;
  }
}
