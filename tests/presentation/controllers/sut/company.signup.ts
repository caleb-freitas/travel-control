import { IAddCompany } from "@/domain/usecases";
import { CompanySignUpController } from "@/presentation/controllers";
import { IValidation } from "@/presentation/protocols";
import { AddAccountRepositorySpy } from "@/tests/data/mocks";
import { ValidationCompositeSpy } from "@/tests/infra/validators/mocks";

type Sut = {
  sut: CompanySignUpController;
  addCompanySpy: IAddCompany;
  validationSpy: IValidation;
};

export function companySignupSut(): Sut {
  const addCompanySpy = new AddAccountRepositorySpy();
  const validationSpy = new ValidationCompositeSpy();
  const sut = new CompanySignUpController(addCompanySpy, validationSpy);
  return {
    sut,
    addCompanySpy,
    validationSpy,
  };
}
