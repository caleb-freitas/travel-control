import { PasswordValidatorAdapter } from "@/infra/validators";
import { IPasswordValidator } from "@/presentation/protocols";

type Sut = {
  sut: IPasswordValidator;
};

export function passwordValidatorSut(): Sut {
  const sut = new PasswordValidatorAdapter();
  return { sut };
}
