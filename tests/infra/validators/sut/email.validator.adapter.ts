import { EmailValidatorAdapter } from "@/infra/validators";
import { IEmailValidator } from "@/presentation/protocols";

type Sut = {
  sut: IEmailValidator;
};

export function emailValidatorSut(): Sut {
  const sut = new EmailValidatorAdapter();
  return { sut };
}
