import { InvalidParamError } from "@/presentation/errors";
import { IValidation } from "@/presentation/protocols";

export class RoleValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly options: string[]
  ) {}

  validate(input: any): Error {
    if (!this.options.includes(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
