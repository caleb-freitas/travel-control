import { InvalidParamError } from "@/presentation/errors";
import { IEmailValidator, IValidation } from "@/presentation/protocols";

export class EmailValidation implements IValidation {
  constructor(
    private readonly email: string,
    private readonly emailValidator: IEmailValidator
  ) {}

  validate(input: any): Error {
    const validEmail = this.emailValidator.isValid(input[this.email]);
    if (!validEmail) {
      return new InvalidParamError(this.email);
    }
  }
}
