import { IValidation } from "@/presentation/protocols/validation";
import { ValidationCompositeSpy } from "@/tests/infra/validators/mocks";
import { ValidationComposite } from "@/validation";

type Sut = {
  sut: ValidationComposite;
  validationsStub: IValidation[];
};

export function validationCompositeSut(): Sut {
  const validationsStub = [
    new ValidationCompositeSpy(),
    new ValidationCompositeSpy(),
  ];
  const sut = new ValidationComposite(validationsStub);
  return {
    sut,
    validationsStub,
  };
}
