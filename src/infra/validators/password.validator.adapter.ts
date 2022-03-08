import { IPasswordValidator } from "../../presentation/protocols";

export class PasswordValidatorAdapter implements IPasswordValidator {
  isValid(password: string): boolean {
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegExp.test(password);
  }
}
