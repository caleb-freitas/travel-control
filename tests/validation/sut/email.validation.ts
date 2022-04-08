import { IEmailValidator } from "@/presentation/protocols";
import { EmailValidatorSpy } from "@/tests/infra/validators/mocks";
import { EmailValidation } from "@/validation";

type Sut = {
  sut: EmailValidation;
  emailValidatorSpy: IEmailValidator;
};

export function emailValidationSut(): Sut {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation("email", emailValidatorSpy);
  return {
    sut,
    emailValidatorSpy,
  };
}
