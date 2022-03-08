import { InvalidParamError } from "../../presentation/errors";
import { IPasswordValidator } from "../../presentation/protocols";
import { IValidation } from "../../presentation/protocols/validation";

export class PasswordValidation implements IValidation {
  constructor(
    private readonly password: string,
    private readonly passwordValidator: IPasswordValidator
  ) {}

  validate(input: any): Error {
    const validPassword = this.passwordValidator.isValid(input[this.password]);
    if (!validPassword) {
      return new InvalidParamError(this.password);
    }
  }
}
