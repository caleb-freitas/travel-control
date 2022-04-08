import { ICnpjValidator } from "@/presentation/protocols";
import { CnpjValidatorSpy } from "@/tests/infra/validators/mocks";
import { CnpjValidation } from "@/validation";

type Sut = {
  sut: CnpjValidation;
  cnpjValidatorSpy: ICnpjValidator;
};

export function cnpjValidationSut(): Sut {
  const cnpjValidatorSpy = new CnpjValidatorSpy();
  const sut = new CnpjValidation("cnpj", cnpjValidatorSpy);
  return {
    sut,
    cnpjValidatorSpy,
  };
}
