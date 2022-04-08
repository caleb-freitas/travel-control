import {
  ICnpjValidator,
  IEmailValidator,
  IPasswordValidator,
  IValidation,
} from "@/presentation/protocols";

export class CnpjValidatorSpy implements ICnpjValidator {
  isCnpjValid = true;
  isCnpj(cnpj: string): boolean {
    return this.isCnpjValid;
  }
}

export class EmailValidatorSpy implements IEmailValidator {
  isEmailValid = true;
  isValid(email: string): boolean {
    return this.isEmailValid;
  }
}

export class PasswordValidatorSpy implements IPasswordValidator {
  isPasswordValid = true;
  isValid(email: string): boolean {
    return this.isPasswordValid;
  }
}

export class ValidationCompositeSpy implements IValidation {
  validate(input: any): Error {
    return null;
  }
}
