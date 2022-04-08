import { CnpjValidatorAdapter } from "@/infra/validators";
import { ICnpjValidator } from "@/presentation/protocols";

type Sut = {
  sut: ICnpjValidator;
};

export function cnpjValidatorSut(): Sut {
  const sut = new CnpjValidatorAdapter();
  return { sut };
}
