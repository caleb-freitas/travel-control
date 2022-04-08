import { IPasswordValidator } from "@/presentation/protocols";
import { PasswordValidatorSpy } from "@/tests/infra/validators/mocks";
import { PasswordValidation } from "@/validation";

type Sut = {
  sut: PasswordValidation;
  passwordValidatorSpy: IPasswordValidator;
};

export function passwordValidationSut(): Sut {
  const passwordValidatorSpy = new PasswordValidatorSpy();
  const sut = new PasswordValidation("password", passwordValidatorSpy);
  return {
    sut,
    passwordValidatorSpy,
  };
}
