import PasswordValidator from "password-validator";

import { IPasswordValidator } from "../presentation/protocols";

export class PasswordValidatorAdapter implements IPasswordValidator {
  isValid(password: string): boolean | any[] {
    const schema = new PasswordValidator();
    schema.is().min(8).has().lowercase().has().uppercase().has().digits();
    return schema.validate(password);
  }
}
